import React, { useContext } from "react";
import { DarkModeContext } from "../pages/_app";
import { formatRelative } from "date-fns";
import CardActionArea from "@material-ui/core/CardActionArea";
import CopyMenu from "./Menu/CopyMenu";
import messageStyles from "../styles/Message.module.scss";

const Message = ({
  createdAt = null,
  text = "",
  displayName = "",
  photoURL = "",
}) => {
  const darkMode = useContext(DarkModeContext);

  return (
    <>
      <CardActionArea>
        <div
          className={
            darkMode
              ? messageStyles["user-message-wrapper-light"]
              : messageStyles["user-message-wrapper-dark"]
          }
        >
          <div className={messageStyles["user-avatar"]}>
            {photoURL ? <img src={photoURL} alt="User Avatar" /> : null}
          </div>
          <div className={messageStyles["user-message-content"]}>
            <div className={messageStyles["user-info-display"]}>
              {displayName ? (
                <p className={messageStyles["user-name"]}>{displayName}</p>
              ) : null}

              {createdAt?.seconds ? (
                <span className={messageStyles["user-message-time-sent"]}>
                  {formatRelative(
                    new Date(createdAt.seconds * 1000),
                    new Date()
                  )}
                </span>
              ) : null}
              <CopyMenu text={text} />
            </div>

            <div>
              <p className={messageStyles["user-message"]}>{text}</p>
            </div>
          </div>
        </div>
      </CardActionArea>
    </>
  );
};

export default Message;
