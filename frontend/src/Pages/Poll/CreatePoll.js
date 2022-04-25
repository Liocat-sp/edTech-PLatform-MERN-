import React, { useState } from "react";
import Button from "../../components/Button";

import Input from "../../components/Input";

const CreatePoll = ({ classes, createPoll, close }) => {
  const [question, setquestion] = useState("");
  const [options, setoptions] = useState([]);
  const [newOption, setnewOption] = useState("");

  /**
   *
   * @param {*} e
   */
  function addOption(e) {
    if (e.key !== "Enter") return;

    setoptions((prev) => {
      const newList = [...prev];
      newList.push({ id: newList.length + 1, title: newOption });
      return newList;
    });
  }

  /**
   * create poll
   */
  function handlerSubmit() {
    const data = {
      question,
      options,
    };

    createPoll(data);
  }

  return (
    <>
      <div className={classes.backdrop}></div>
      <div className={classes.pollModel}>
        <h2>Create Poll</h2>
        <Input
          label={"Question :"}
          type="text"
          onChange={(e) => setquestion(e.target.value)}
        />
        <div>Options</div>
        <div className={classes.coptions}>
          {options.map((item, key) => (
            <div className={classes.pollOptionWrapper} key={key}>
              <div className={classes.pollOption}>{item.title}</div>
            </div>
          ))}
          <Input
            type="text"
            onChange={(e) => setnewOption(e.target.value)}
            onKeyPress={addOption}
            value={newOption}
            placeHolder="Add new option"
          />
        </div>
        <div className={classes.CreatePollBottom}>
          <div style={{ display: "flex",marginLeft: "auto" }}>
            <Button onClick={close} style={{ marginRight: "1.2rem" }}>
              Cancle
            </Button>
            <Button onClick={handlerSubmit} >
              Create Poll
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePoll;
