"use client";

import { convertSegmentPathToStaticExportFilename } from "next/dist/shared/lib/segment-cache/segment-value-encoding";
import { useEffect, useRef } from "react";

interface PopupProps {
  right: string;
  left: string;
  y: string;
  onClose: () => void;
}

export default function PopupDialog({ right, left, y, onClose }: PopupProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
      className={"rounded-xl p-6 shadow-2xl w-800 border m-0 bg-gray-50"}
    >
      <h3>予定を追加</h3>
      <input
        type="text"
        placeholder="タイトルを入力"
        className="w-full border rounded px-2 py-1 mb-2"
      />
      <textarea />
      <div className="fles justify-end gap-2">
        <button onClick={onClose} className="px-3 py-1 border rounded">
          キャンセル
        </button>
        <button className="px-3 py-1 bg-blue-500 text-white rounded">
          保存
        </button>
      </div>
    </dialog>
  );
}
