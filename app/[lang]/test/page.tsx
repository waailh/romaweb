"use client";

import { useState } from "react";
import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";

const TestPage = () => {
  const [event, setEvent] = useState<string>("");
  const [params, setParams] = useState<Record<string, string>>({});
  const [newKey, setNewKey] = useState<string>("");
  const [newValue, setNewValue] = useState<string>("");

  const handleAddParam = () => {
    if (newKey.trim() && newValue.trim()) {
      setParams((prev) => ({
        ...prev,
        [newKey]: newValue,
      }));
      setNewKey("");
      setNewValue("");
    }
  };

  const handleRemoveParam = (key: string) => {
    setParams((prev) => {
      const updatedParams = { ...prev };
      delete updatedParams[key];
      return updatedParams;
    });
  };

  const handleSendEvent = () => {
    // if (event) {
    //   console.log("event name: ", event);
    //   console.log("event params: ", params);
    //   try {
    //     // const res = sendGAEvent("event", event, params);
    //     const res = sendGTMEvent({ event, value: params });
    //     console.log("response: ", res);
    //   } catch (error) {
    //     console.log("error: ", error);
    //   }
    // }
  };

  return (
    <div className="wrapper">
      <div className="flex flex-col space-y-4 w-fit p-4 border rounded shadow">
        {/* Event Name Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Event Name:</label>
          <input
            className="border p-2 rounded w-full"
            type="text"
            placeholder="Enter event name"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
          />
        </div>

        {/* Add Parameter Section */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Add Parameter:
          </label>
          <div className="flex space-x-2">
            <input
              className="border p-2 rounded flex-grow"
              type="text"
              placeholder="Key"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
            />
            <input
              className="border p-2 rounded flex-grow"
              type="text"
              placeholder="Value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={handleAddParam}
            >
              Add
            </button>
          </div>
        </div>

        {/* Display Parameters */}
        <div>
          <label className="block text-sm font-medium mb-1">Parameters:</label>
          <div className="space-y-2">
            {Object.entries(params).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span className="flex-grow">
                  <strong>{key}:</strong> {value}
                </span>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleRemoveParam(key)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Send Event Button */}
        <button
          disabled={true}
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleSendEvent}
        >
          Send Event
        </button>
      </div>
    </div>
  );
};

export default TestPage;
