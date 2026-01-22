import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState({ username: false, roomId: false });
  const navigate = useNavigate();

  const generateRoomId = () => {
    setRoomId(uuidv4());
    toast.success("Room ID generated");
  };

  const joinRoom = (e) => {
    e.preventDefault();
    const newError = {
      username: username.trim().length === 0,
      roomId: roomId.trim().length === 0,
    };
    if (!username || !roomId) {
      toast.error("Please enter all the fields.");
      setError(newError);
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: { username },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-darkBg via-slate-900 to-darkBg">
      <div className="border-4 border-gray-400 bg-slate-800 shadow-2xl h-3/4 w-11/12 md:w-1/2 rounded-lg flex flex-col">
        {/* Logo Section */}
        <div className="px-6 py-8 text-center border-b border-gray-400">
          <div className="text-7xl mb-4">💻</div>
          <h1 className="text-3xl font-bold text-blue-400">Coders</h1>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center px-6 py-8">
          {/* Title */}
          <h2 className="text-light text-2xl font-bold text-center mb-8">Enter the ROOM ID</h2>

          {/* Form */}
          <form className="space-y-6">
            {/* Username Input */}
            <div>
              <input
                type="text"
                className="input-field w-full"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {error.username && (
                <p className="text-red-400 text-sm mt-2">✗ Username cannot be empty!</p>
              )}
            </div>

            {/* Room ID Input */}
            <div>
              <input
                type="text"
                className="input-field w-full"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
              {error.roomId && (
                <p className="text-red-400 text-sm mt-2">✗ Room ID cannot be empty!</p>
              )}
            </div>

            {/* Join Button */}
            <button
              type="button"
              className="btn-primary w-full"
              onClick={joinRoom}
            >
              Join
            </button>
          </form>

          {/* Generate Room */}
          <div className="mt-8 text-center">
            <p className="text-light mb-4">Don't have a room ID?</p>
            <button
              type="button"
              className="btn-secondary w-full"
              onClick={generateRoomId}
            >
              Create New Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
