import { ComingSoonButton } from "@/components/ComingSoonButton";
import Calendar from "../components/calendar/Calendar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-50">
      <div className="flex flex-col text-center mx-auto md:mt-4 mt-2 border border-gray-300 py-2 px-3 text-sm md:text-base bg-white">
        <h2 className="pb-1 text-red-600 font-medium text-base md:text-lg">
          📍OpenCalendarとは
        </h2>
        <p>OpenCalendarは、ログイン不要ですぐに使えるカレンダーアプリ。</p>
        <p>自分の予定を気軽に追加・確認しましょう。</p>
      </div>
      <div id="Calendar">
        <Calendar />
      </div>
    </main>
  );
}
