import React, { useState } from "react";
import Client from "./Client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ clients, roomId }) => {
  const navigate = useNavigate();

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied.");
    } catch (error) {
      toast.error("Unable to copy Room ID");
    }
  };

  const handleLeaveRoom = () => {
    navigate("/");
  };

  return (
    <div className="text-light h-full">
      <div className="my-4 text-4xl text-center">
        💻
      </div>
      <hr className="w-3/4 mx-auto" />
      <div className="h-8/12">
        {clients.map((client) => (
          <div className="mt-5" key={client.socketId}>
            <Client socketId={client.socketId} username={client.username} />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center flex-col mt-3 gap-3">
        <button
          onClick={copyRoomId}
          className="btn-secondary w-7/12 text-sm"
        >
          📋 Copy Room ID
        </button>
        <button
          onClick={handleLeaveRoom}
          className="btn-danger w-7/12 text-sm"
        >
          🚪 Leave Room
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
