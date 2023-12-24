import SignOutButton from "@/components/custom-ui/SignOutButton";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";

async function page() {
  return (
    <div>
      <CreateTodo/>
      <TodoList/>
      <SignOutButton/>
    </div>
  );
}

export default page;
