import {checkUser} from '@/lib/checkUser';

export default async function Navbar() {
  const user = await checkUser();
  return (
    <nav className="w-full p-4 bg-gray-800 text-white flex justify-between items-center">
      <div className="text-2xl font-bold">ExpenseAI</div>
      <div>{/* Future user info can be displayed here */}</div>
    </nav>
  );
}
