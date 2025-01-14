import { ChatState } from "../../context/ChatProvider.jsx";
import { useEffect } from "react";
import axios from "axios";
import * as moment from "moment";

const Letter = () => {
  const {
    selectedMessageData,
    selectedChat,
    setSelectedMessageData,
    message_id,
  } = ChatState();

  const fetchMessage = async () => {
    if (!selectedChat) return;

    try {
      const { data } = await axios.get(
        `http://localhost:5000/user/message/read/${message_id}/`
      );
      console.log(data);
      setSelectedMessageData(data);
    } catch (err) {
      console.log("Error fetching message");
    }
  };

  useEffect(() => {
    fetchMessage();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="opened-letter-wrapper">
      <div className="opened-letter">
        <div className="to-details">
          <div>
            <h2>
              {selectedMessageData ? selectedMessageData.sender.username : null}
            </h2>
            <p>
              {selectedMessageData
                ? moment(selectedMessageData.createdAt).format("DD-MM-YYYY")
                : null}
            </p>
          </div>
        </div>
        <div className="writing-area">
          <p>{selectedMessageData ? selectedMessageData.content : null}</p>
        </div>
      </div>
    </div>
  );
};

export default Letter;
