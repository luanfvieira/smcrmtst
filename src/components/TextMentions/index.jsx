import React, { memo, useEffect, useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import api from "src/utils/api";

const TextMentions = ({ handleChange }) => {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await api.get("/info/users");
      setUsers(data.users.map((user) => ({ display: user.user, id: user.id })));
    }

    fetchUsers();
  }, []);

  function onChange(e) {
    setValue(e.target.value);
    handleChange("details", e.target.value);
  }

  return (
    <MentionsInput
      value={value}
      onChange={onChange}
      style={{
        control: {
          backgroundColor: "#fff",
          fontSize: 14,
          fontWeight: "normal",
          border: "1px solid #757575",
          borderRadius: "12px",
        },

        "&multiLine": {
          control: {
            minHeight: 63,
          },
          highlighter: {
            padding: 9,
            border: "1px solid transparent",
            minHeight: "63px",
          },
          input: {
            padding: 9,
            border: "1px solid silver",
            borderRadius: "12px",
            outline: 0,
          },
        },

        // "&singleLine": {
        //   display: "inline-block",
        //   width: 180,

        //   highlighter: {
        //     padding: 1,
        //     border: "2px inset transparent",
        //   },
        //   input: {
        //     padding: 1,
        //     border: "2px inset",
        //     // outline: 0,
        //   },
        // },

        suggestions: {
          list: {
            backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.15)",
            fontSize: 14,
          },
          item: {
            padding: "5px 15px",
            borderBottom: "1px solid rgba(0,0,0,0.15)",
            "&focused": {
              backgroundColor: "#cee4e5",
            },
          },
        },
      }}
      placeholder="Detalhes"
    >
      <Mention
        displayTransform={(_, user) => `@${user}`}
        markup="@__display__@"
        trigger="@"
        data={users}
        appendSpaceOnAdd
        style={{
          backgroundColor: "#cee4e5",
          textDecoration: "underline",
        }}
      />
    </MentionsInput>
  );
};

export default memo(TextMentions);
