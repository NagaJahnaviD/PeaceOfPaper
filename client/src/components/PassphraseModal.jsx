import { useState } from "react";

const PassphraseModal = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) {
      alert("Passphrase cannot be empty");
      return;
    }
    sessionStorage.setItem("passphrase", input);
    onSubmit(input);
  };

  const handleDownload = () => {
    if (!input.trim()) {
      alert("Please enter a passphrase first.");
      return;
    }

    const blob = new Blob(
      [
        `📝 Your Journal Passphrase Backup\n\nSave this file securely.\nAnyone with access can decrypt your journal.\n\nPassphrase: ${input}`,
      ],
      { type: "text/plain;charset=utf-8" }
    );

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "journal-passphrase.txt";
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-[var(--surface)] p-6 rounded-lg w-[90%] max-w-md text-center shadow-xl">
        <h2 className="text-xl font-bold mb-4">🔐 Enter Your Journal Passphrase</h2>

        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Your secret passphrase"
          className="w-full p-3 rounded border border-gray-300 mb-4 focus:outline-none"
        />

        <button
          onClick={handleSubmit}
          className="bg-[var(--primary)] text-white px-4 py-2 rounded hover:scale-105 transition"
        >
          Unlock Journal
        </button>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 italic">
          💡 Tip: Save your passphrase so you don’t lose access later.
        </p>

        <button
          onClick={handleDownload}
          className="mt-2 text-sm text-blue-500 hover:underline"
        >
          Download Backup Passphrase
        </button>
      </div>
    </div>
  );
};

export default PassphraseModal;
