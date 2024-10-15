import TelegramAuth from "@/components/TelegramAuth";
import { getSession } from "@/utils/sessions";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Jwt Authentication for Telegram Mini Apps
      </h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <div className="flex justify-center text-center">
        <TelegramAuth />
      </div>
    </main>
  );
}
