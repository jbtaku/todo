import SignOutButton from "@/components/custom-ui/SignOutButton";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";
import { fetcher } from "@/utils/fetcher";
import { Todo } from "@prisma/client";

async function page() {
  const todo = await fetcher<Todo[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`,
    {next: {tags: ["todo"]}}
  );
  const todo2 = await fetcher<Todo[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/todo2`,
    {next: {tags: ["todo2"]}}
  );
  return (
    <div className="space-y-8">
      <SignOutButton />
      <div className="border-4 border-slate-700 p-6">
        <h2 className="text-4xl font-bold">react queryを使わない場合(Todo1)</h2>
        {todo.map((item) => {
          return <p key={item.id}>{item.content}</p>;
        })}
      </div>
      <div className="border-4 border-pink-600 p-6">
        <h2 className="text-4xl font-bold">react queryを使わない場合(Todo2)</h2>
        {todo2.map((item) => {
          return <p key={item.id}>{item.content}</p>;
        })}
      </div>
      <div className="border-4 border-green-600 p-6 space-y-4">
        <h2 className="text-4xl font-bold">todo Area</h2>
        <CreateTodo />
        <TodoList />
      </div>
      {/* <div className="border-4 border-blue-600 p-6 space-y-12">
        <h2 className="text-4xl font-bold">S3 Area</h2>
        <div className="border-4 border-orange-500 p-6 space-y-4">
          <h2 className="text-4xl font-bold">Image Area</h2>
          <UploadImageForm />
          <div>
            <UploadedImage />
          </div>
        </div>
        <div className="border-4 border-yellow-400 p-6 space-y-4">
          <h2 className="text-4xl font-bold">Video Area</h2>
          <UploadVideoForm />
          <div>
            <UploadedVideo />
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default page;
