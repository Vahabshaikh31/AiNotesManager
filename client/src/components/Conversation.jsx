import { useState, useEffect } from "react";
import axios from "axios";

export default function Conversation() {
  const [userId] = useState("testUser");
  const [mainLabels, setMainLabels] = useState([]);
  const [selectedSubLabel, setSelectedSubLabel] = useState(null);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [newMainLabel, setNewMainLabel] = useState("");
  const [newSubLabel, setNewSubLabel] = useState("");

  useEffect(() => {
    fetchLabels();
  });

  async function fetchLabels() {
    const { data } = await axios.get(
      `http://localhost:3000/api/chat/main-labels/${userId}`
    );
    setMainLabels(data);
  }

  const addMainLabel = async () => {
    if (!newMainLabel.trim()) return;
    await axios.post("http://localhost:3000/api/chat/main-labels", {
      userId,
      mainLabelId: newMainLabel,
    });
    setNewMainLabel("");
    fetchLabels();
  };

  const addSubLabel = async (mainLabelId) => {
    if (!newSubLabel.trim()) return;
    await axios.post("http://localhost:3000/api/chat/sub-labels", {
      mainLabelId,
      subLabelId: newSubLabel,
    });
    setNewSubLabel("");
    fetchLabels();
  };

  const fetchChat = async (subLabelId) => {
    setSelectedSubLabel(subLabelId);
    const { data } = await axios.get(
      `http://localhost:3000/api/chat/${subLabelId}`
    );
    setChat(data);
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedSubLabel) return;
    const { data } = await axios.post("http://localhost:3000/api/chat/chats", {
      subLabelId: selectedSubLabel,
      message,
    });
    setChat([
      ...chat,
      { sender: "user", message },
      { sender: "bot", message: data.botReply },
    ]);
    setMessage("");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-4">Chatbot</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="New Main Label"
          value={newMainLabel}
          onChange={(e) => setNewMainLabel(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addMainLabel}
        >
          Add
        </button>
      </div>

      {mainLabels.map((ml) => (
        <div key={ml.mainLabelId} className="mb-4 p-4 border rounded-lg">
          <h3 className="font-semibold text-lg">{ml.mainLabelId}</h3>
          <div className="flex gap-2 mt-2">
            <input
              className="border p-2 rounded w-full"
              placeholder="New Sub Label"
              value={newSubLabel}
              onChange={(e) => setNewSubLabel(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => addSubLabel(ml.mainLabelId)}
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {ml.subLabels.map((sub) => (
              <button
                key={sub.subLabelId}
                className="bg-gray-200 px-3 py-1 rounded text-sm"
                onClick={() => fetchChat(sub.subLabelId)}
              >
                {sub.subLabelId}
              </button>
            ))}
          </div>
        </div>
      ))}

      {selectedSubLabel && (
        <div className="mt-4 border p-4 rounded-lg bg-gray-50">
          <h3 className="font-semibold text-lg">Chat</h3>
          <div className="h-40 overflow-y-auto p-2 border rounded mt-2 bg-white">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`p-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block px-3 py-1 rounded-lg text-white ${msg.sender === "user" ? "bg-blue-500" : "bg-gray-500"}`}
                >
                  {msg.sender}: {msg.message}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input
              className="border p-2 rounded w-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
