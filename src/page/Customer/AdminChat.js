import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { IoSend } from "react-icons/io5";
// Kết nối đến server backend qua Socket.IO
const socket = io("http://localhost:5000");

const AdminChat = () => {
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    // Hàm tải danh sách các phòng chat từ JSON Server
    const loadRooms = async () => {
        try {
            const response = await fetch("http://localhost:5001/chats");
            const data = await response.json();
            setRooms(data.map((room) => room.id));
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
    };

    // Hàm tải tin nhắn từ phòng chat hiện tại
    const loadMessages = async (roomId) => {
        try {
            const response = await fetch(
                `http://localhost:5001/chats/${roomId}`
            );
            const data = await response.json();
            if (data && data.messages) {
                setMessages(data.messages);
                console.log(data.messages);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // Khi admin chọn phòng chat mới
    useEffect(() => {
        if (currentRoom) {
            socket.emit("joinRoom", currentRoom);
            socket.on("loadMessages", (loadedMessages) => {
                setMessages(loadedMessages);
            });
            socket.on("message", (newMessage) => {
                setMessages((prev) => [...prev, newMessage]);
            });
            loadMessages(currentRoom);

            return () => {
                socket.off("loadMessages");
                socket.off("message");
            };
        }
    }, [currentRoom]);
    const sendMessage = async () => {
        if (message.trim()) {
            const newMessage = {
                sender: "admin",
                messageContent: message,
                messageTime: new Date().toISOString(),
                sendID: "admin1",
                receivedID: currentRoom,
            };
            try {
                const response = await fetch(
                    `http://localhost:5001/chats/${currentRoom}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            messages: [...messages, newMessage],
                        }),
                    }
                );

                if (response.ok) {
                    socket.emit("sendMessage", {
                        roomId: currentRoom,
                        message: newMessage,
                    });
                    setMessage("");
                } else {
                    console.error("Error updating JSON Server");
                }
            } catch (error) {
                console.error("Error updating JSON Server:", error);
            }
        }
    };
    useEffect(() => {
        loadRooms();
    }, []);
    const lastMessageRef = useRef(null);
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
    const formatMessageTime = (messageTime) => {
        const now = new Date();
        const messageDate = new Date(messageTime);
        const diffTime = now - messageDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        const options = {
            weekday: "short", // Thứ
            hour: "2-digit",
            minute: "2-digit",
        };

        if (diffDays < 7) {
            // Nếu tin nhắn trong 7 ngày gần đây
            return messageDate.toLocaleTimeString("vi-VN", options); // Giờ:phút
        } else {
            // Nếu tin nhắn cũ hơn 7 ngày
            return (
                messageDate.toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                }) +
                ", " +
                messageDate.toLocaleTimeString("vi-VN", options)
            ); // Ngày/tháng/năm, giờ:phút
        }
    };
    return (
        <div className="flex justify-end">
            <div className="flex flex-row h-screen w-[100%]">
                {/* Danh sách các phòng chat */}
                <div className="w-[30%] border-r-gray-100 border p-3 rounded-2xl m-2 shadow-md">
                    <h3 className="text-3xl font-bold pb-3 text-center">Đoạn chat</h3>
                    <div className="list-none p-0">
                        {rooms.map((room) => (
                            <div
                                key={room}
                                className={`flex items-center cursor-pointer p-2 rounded-md ${
                                    room === currentRoom
                                        ? "bg-gray-200"
                                        : "bg-transparent"
                                }`}
                                onClick={() => setCurrentRoom(room)} // Admin chọn phòng chat
                            >
                                <img
                                    src="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien-600x600.jpg"
                                    alt=""
                                    className="w-10 h-10 rounded-full mr-2"
                                />
                                <div className="text-xl ">{room}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border-r-gray-100 border rounded-2xl my-2 shadow-md w-[70%] scrollbar scrollbar-thumb-blue-300 scrollbar-track-white">
                    <h3 className="shadow-md px-5 pt-5">
                        {currentRoom ? (
                            <>
                                <div className="flex pb-2">
                                    <img
                                        src="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien-600x600.jpg"
                                        alt=""
                                        className="w-10 h-10 rounded-full mr-2"
                                    />
                                    <div className="text-xl ">
                                        {currentRoom}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-xl pb-4 font-bold">
                                    Chọn phòng chat
                                </div>
                            </>
                        )}
                    </h3>
                    <div
                        className={`${
                            messages.length < 10 ? "pt-2" : ""
                        } flex flex-col h-[88vh] `}
                    >
                        <div className=" pl-5 flex-1 overflow-y-scroll scrollbar scrollbar-thumb-blue-300 scrollbar-track-white mb-5">
                            {messages.map((msg, index) => {
                                const isUserMessage = msg.sender === "user";
                                const isLastUserMessage =
                                    isUserMessage &&
                                    (index === messages.length - 1 ||
                                        messages[index + 1].sender !== "user");

                                return (
                                    <div
                                        key={index}
                                        ref={
                                            index === messages.length - 1
                                                ? lastMessageRef
                                                : null
                                        }
                                        className={`flex mr-2  ${
                                            msg.sender === "admin"
                                                ? "justify-end"
                                                : "justify-start items-end"
                                        }`}
                                    >
                                        {isUserMessage && isLastUserMessage && (
                                            <div className="flex-shrink-0">
                                                <img
                                                    src="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien-600x600.jpg"
                                                    alt="Admin Avatar"
                                                    className="w-9 h-9 rounded-full mr-1"
                                                />
                                            </div>
                                        )}
                                        <div className="relative">
                                            <div
                                                className={`relative p-2 group rounded-2xl inline-block max-w-md break-words text-left ${
                                                    msg.sender === "admin"
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-gray-200 text-black"
                                                } ${
                                                    index > 0 &&
                                                    messages[index - 1]
                                                        .sender !== msg.sender
                                                        ? "mt-3"
                                                        : "mt-[2px]"
                                                }`}
                                                style={{
                                                    marginLeft:
                                                        isUserMessage &&
                                                        isLastUserMessage
                                                            ? "0"
                                                            : "40px",
                                                }}
                                            >
                                                {msg.messageContent}
                                                <div
                                                    className={`${
                                                        msg.sender === "admin"
                                                            ? "right-full"
                                                            : "left-full"
                                                    } p-3 bg-stone-600 text-white rounded-xl mix-w-[200px] overflow-x-auto absolute top-[0%] back text-xs hidden z-50 group-hover:block whitespace-nowrap`}
                                                >
                                                    {formatMessageTime(
                                                        msg.messageTime
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {/* Form gửi tin nhắn */}
                        {currentRoom && (
                            <div className="flex px-5 items-center">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Nhập tin nhắn..."
                                    className="h-auto min-h-10 max-h-36 flex-1 focus:outline-none resize-none overflow-hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    rows={1}
                                    onInput={(e) => {
                                        e.target.style.height = "auto"; // Reset the height
                                        e.target.style.height = `${e.target.scrollHeight}px`; // Set the new height based on content
                                        if (e.target.scrollHeight > 144) {
                                            e.target.style.height = "144px"; // Chiều cao tối đa
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            sendMessage();
                                        }
                                    }}
                                />
                                <button onClick={sendMessage} className="pl-2">
                                    <IoSend className="text-blue-500 hover:text-blue-700 w-6 h-6" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminChat;
