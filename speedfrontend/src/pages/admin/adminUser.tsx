import { GetStaticProps, NextPage } from "next";
import SortableTable from "@/components/table/SortableTable";
import styles from '@/styles/articles.module.css';
import { useRouter } from "next/router";

interface UserInterface {
  id: string; // Assuming there's an ID field for the user
  username: string;
  email: string;
  role: string;
}

type UsersProps = {
  users: UserInterface[];
};

const Users: NextPage<UsersProps> = ({ users }) => {
  const router = useRouter();

  const headers: { key: keyof UserInterface; label: string }[] = [
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ];


  return (
    <div className={styles.container}>
      <h1>Admin View: Users List</h1>
      <p>List of all users on SPEED</p>
      <SortableTable headers={headers} data={users}/>
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
