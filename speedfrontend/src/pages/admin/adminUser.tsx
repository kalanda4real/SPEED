import { GetStaticProps, NextPage } from "next";
import SortableTable from "@/components/table/SortableTable";
import styles from '@/styles/articles.module.css';
import { useState } from "react";
import { useRouter } from "next/router";

interface UserInterface {
  id: string;
  username: string;
  email: string;
  role: string;
}

type UsersProps = {
  users: UserInterface[];
};

const Users: NextPage<UsersProps> = ({ users }) => {
  const [updatedUsers, setUpdatedUsers] = useState(users);
  const [loadingUsername, setLoadingUsername] = useState<string | null>(null); 
  const router = useRouter();

  const headers: { key: keyof UserInterface; label: string }[] = [
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ];

  const roles = ["user", "mod", "analyst", "admin"];

  
  const handleRoleChange = async (username: string, newRole: string) => {
    setLoadingUsername(username); 
    try {
      const response = await fetch(`http://localhost:8082/api/users/username/${username}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      const updatedUser = await response.json();

      // Update local state
      setUpdatedUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.username === username ? { ...user, role: updatedUser.role } : user
        )
      );
    } catch (error) {
      console.error('Error updating role:', error);
    } finally {
      setLoadingUsername(null);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Admin View: Users List</h1>
      <p>List of all users on SPEED</p>
      <SortableTable
        headers={headers}
        data={updatedUsers.map((user) => ({
          ...user,
          role: (
            <select
              value={user.role}
              onChange={(e) => handleRoleChange(user.username, e.target.value)} 
              className={styles.dropdown}
              disabled={loadingUsername === user.username} 
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          ),
        }))}
      />
      <button
        className={styles.button}
        onClick={() => router.push('/admin/adminhome')}
      >
        Back to admin home
      </button>
    </div>
  );
};

export const getStaticProps: GetStaticProps<UsersProps> = async () => {
  try {
    const response = await fetch('http://localhost:8082/api/users');

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const users = await response.json();

    return {
      props: {
        users,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      props: {
        users: [],
      },
    };
  }
};

export default Users;
