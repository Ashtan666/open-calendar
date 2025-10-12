"use client";

import { CalendarEvent, getEventFromLocalStorage } from "@/utils/localStrage";
import { useEffect, useRef } from "react";

interface PopupProps {
  right: string;
  left: string;
  y: string;
  startDate: string;
  event?: CalendarEvent;
  onClose: () => void;
  onSave: (title: string, date: string, description: string | null) => void;
}

export default function PopupDialog({
  right,
  left,
  y,
  startDate,
  event,
  onClose,
  onSave,
}: PopupProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const isEdit = event !== undefined;

  useEffect(() => {
    if (dialogRef.current) {
      // dialogRef.current.showModal(); // Modal
      dialogRef.current.show(); // Modeless
    }
    // 外クリックで閉じる処理
    const handleClick = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      style={{
        position: "absolute",
        left: left,
        right: right,
        top: y,
        zIndex: 1,
      }}
      className={"rounded-xl px-5 py-6 shadow-2xl w-800 border m-0 bg-gray-50"}
    >
      <h3 className="pb-3">{isEdit ? "確認／編集" : "新規作成"}</h3>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="タイトル"
        defaultValue={isEdit ? event.title : ""}
        className="w-full border rounded px-2 py-1 mb-2"
      />
      <input
        type="date"
        id="event-start"
        name="event-start"
        defaultValue={isEdit ? event.startDate : startDate}
        min="1990-01-01"
        max="2100-12-31"
        className="w-full border rounded px-2 py-1 mb-2"
      />
      {/* <input
        type="date"
        id="event-end"
        name="event-end"
        min="1990-01-01"
        max="2100-12-31"
        className="w-full border rounded px-2 py-1 mb-2"
      /> */}
      <textarea
        id="description"
        name="description"
        placeholder="メモ"
        defaultValue={isEdit ? event.description : ""}
        className="w-full border rounded px-2 py-1 mb-2"
      />
      <div className="fles justify-end gap-2">
        <button onClick={onClose} className="px-3 py-1 border rounded">
          キャンセル
        </button>
        <button
          onClick={() => {
            // set values
            const dialogEl = dialogRef.current.querySelectorAll(
              '[id="title"],[id="event-start"],[id="description"]'
            );
            const title = dialogEl.item(0).value; //event title
            const startDate = dialogEl.item(1).value; // event start date
            const description = dialogEl.item(2).value; // event description

            if (
              title === null ||
              title?.trim() === "" ||
              startDate === null ||
              startDate === "yyyy/mm/dd" ||
              startDate === ""
            ) {
              console.log("No save data entered");
              return;
            }

            // call onSave to set events
            onSave(title, startDate, description);
            console.log(
              "Save event is conplated.",
              "\ntitle: ",
              title,
              "\nstartDate:",
              startDate,
              "description:",
              description
            );

            // call onClose
            onClose();
          }}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          保存
        </button>
      </div>
    </dialog>
  );
}
