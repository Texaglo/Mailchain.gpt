import React, { useState } from "react";
import axios from "axios";

//INTERNAL IMPORT
import styles from "./MailSender.module.css";

const MailSender = () => {
  // const [name, setName] = useState("");
  // const [toEmail, setToEmail] = useState("");
  // const [select, setSelect] = useState("");
  // const [getTime, setGetTime] = useState();
  const [fields, setFields] = useState([
    { name: null, toEmail: null, message: null, getTime: null },
  ]);

  console.log(fields);

  const url = process.env.NEXT_PUBLIC_API_URL;

  const handleMailSend = async () => {
    const result = await axios
      .post(`${url}/sendMail`, fields)
      .then(async (response) => {
        console.log(response);
        console.log(response.data.Response_message);
      })
      .catch(async (error) => {
        console.log(error);
      });
  };

  //ONCHANGE FUNCTIONS

  function handleChange(i, event) {
    const values = [...fields];
    values[i].name = event.target.value;
    setFields(values);
  }
  function handleChangeEmail(i, event) {
    const values = [...fields];
    values[i].toEmail = event.target.value;
    setFields(values);
  }
  function handleChangeSelect(i, event) {
    const values = [...fields];
    values[i].message = event.target.value;
    setFields(values);
  }
  function handleChangeTime(i, event) {
    const values = [...fields];
    values[i].getTime = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  return (
    <div className={styles.form_container}>
      <p className={styles.title}>MailChain.GPT</p>
      <button type="button" onClick={() => handleAdd()}>
        Add Email sequence
      </button>

      <div className="Proposal_add">
        {fields.map((field, idx) => {
          return (
            <form className={styles.form} key={`${field}-${idx}`}>
              <div className={styles.input_group}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={(e) => handleChange(idx, e)}
                />
              </div>
              <div className={styles.input_group}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => handleChangeEmail(idx, e)}
                />
              </div>
              {/* <div className={styles.input_group}>
  <label htmlFor="message">Message</label>
  <input type="text" name="message" id="message" placeholder="" />
  <div className={styles.forgot}></div>
</div> */}
              <div className={styles.input_group}>
                <label htmlFor="message"> Set schedule</label>
                <input
                  type="datetime-local"
                  id="time"
                  name="time"
                  onChange={(e) => handleChangeTime(idx, e)}
                />
                {/* <input type="text" name="message" id="message" placeholder="" /> */}
                <div className={styles.forgot}></div>
              </div>
              <div className={styles.input_group}>
                <label htmlFor="message">Select Option</label>
                <select
                  value={fields[idx].select}
                  onChange={(e) => handleChangeSelect(idx, e)}
                >
                  <option></option>
                  <option>write me a poem within 20 characters</option>
                  <option>write me a poem within 30 characters</option>
                  <option>write me a poem within 40 characters</option>
                </select>
                <div className={styles.forgot}></div>
              </div>
              <button type="button" onClick={() => handleRemove(idx)}>
                X
              </button>
            </form>
          );
        })}
      </div>
      <button type="button" className={styles.sign} onClick={handleMailSend}>
        Send Messages
      </button>
    </div>
  );
};

export default MailSender;
