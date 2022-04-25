import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { addResponse, createPoll, getPolls } from "../../Actions/pollAction";
import Button from "../../components/Button";
import CreatePoll from "./CreatePoll";

const useStyles = createUseStyles({
  flex: {
    display: "flex",
    justifyContent: "center",
  },
  flexCenter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pollsCenter: {
    maxWidth: 600,
    minWidth: 600,
  },
  page: {
    padding: "2rem",
  },
  pollOptionWrapper: {
    position: "relative",
    background: "#ececec",
    borderRadius: 6,
    cursor: "pointer",
    padding: 12,
    margin: "12px 0",
  },
  pollOption: {
    zIndex: 1,
    position: "relative",
  },
  pollResponses: {
    borderRadius: "inherit",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    background: "#ffd49e",
    height: "100%",
    zIndex: 0,
    transition: "all 600ms",
  },
  pollModel: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    padding: 14,
    borderRadius: 4,
    minWidth: 500,
    zIndex: 10000,
  },
  backdrop: {
    background: "#1d1d1d82",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100vw",
    height: "100vh",
  },
  coptions: {
    padding: 12,
  },
  CreatePollBottom: {
    display: "flex",
  },
});

/**
 * Main poll component
 */
const Poll = () => {
  const classes = useStyles();
  const [polls, setpolls] = useState([]);
  const [open, setopen] = useState(false);

  useEffect(() => {
    async function init() {
      const response = await getPolls();
      setpolls(response);
    }
    init();
  }, []);

  function close() {
    setopen(false);
  }

  async function createPollHandler(data) {
    const res = await createPoll(data.question, data.options);
    const response = await getPolls();
    setpolls(response);
    close();
  }

  async function submitAns(id, option) {
    const resp = await addResponse(id, option);

    setpolls((prev) => {
      const newData = [...prev];
      const index = newData.findIndex((item) => item.id === resp.id);
      newData[index] = resp;
      return newData;
    });
  }

  return (
    <div className={`${classes.page} ${classes.flex}`}>
      <div className={classes.pollsCenter}>
        <div className={classes.flexCenter}>
          <h1>Polls</h1>
          <Button
            onClick={() => {
              setopen(true);
            }}
          >
            Create New Poll
          </Button>
        </div>
        {polls.map((item, key) => (
          <div key={key}>
            <h2>
              Question {key + 1}: {item.question}
            </h2>
            <div>
              {item.options.map((option, index) => (
                <div
                  className={classes.pollOptionWrapper}
                  key={index}
                  onClick={() => {
                    item.awaitingUserResp && submitAns(item.id, option.id);
                  }}
                >
                  <div className={classes.pollOption}>{option.title}</div>
                  {!item.awaitingUserResp && (
                    <div
                      className={classes.pollResponses}
                      style={{
                        width: `${
                          item.result[option.id] ? item.result[option.id] : "0"
                        }%`,
                      }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {open && (
        <CreatePoll
          classes={classes}
          close={close}
          createPoll={createPollHandler}
        />
      )}
    </div>
  );
};

export default Poll;
