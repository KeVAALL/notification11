import { useEffect, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import "./App.css";
import { Box } from "@mui/material";

async function notifyUser(notificationText = "Thank you") {
  console.log("Here");
  if (!("Notification" in window)) {
    alert("No support");
  }
  // else if (Notification.permission === "granted") {
  //   console.log("Granted");
  //   // const notification =
  //   new Notification(notificationText);
  // } else if (Notification.permission === "denied") {
  //   console.log("Disabled");
  //   await Notification.requestPermission().then((permission) => {
  //     console.log("Asking...");
  //     if (permission === "granted") {
  //       // const notification =
  //       new Notification(notificationText);
  //     }
  //   });
  // }
  if ("Notification" in window) {
    console.log("In Window");

    if (Notification.permission === "granted") {
      console.log("Granted");

      // const notification =
      new Notification(notificationText);
    } else if (Notification.permission === "denied") {
      console.log("Disabled");
      // await

      Notification.requestPermission().then((permission) => {
        console.log("Asking..." + permission);
        if (permission === "denied") {
          // const notification =
          new Notification(notificationText);
        }
      });
    } else if (Notification.permission === "default") {
      console.log("Default");
      // await

      Notification.requestPermission().then((permission) => {
        console.log("Asking..." + permission);
        if (permission === "denied") {
          // const notification =
          new Notification(notificationText);
        }
      });
    }
  }
}

function App() {
  const [userResponded, setUserResponded] = useState(false);

  // document.addEventListener("DOMContentLoaded", function () {});
  useEffect(() => {
    if (!Notification) {
      alert(
        "Desktop notifications not available in your browser. Try Chromium."
      );
      return;
    }

    if (Notification.permission !== "granted") notifyUser();
  });

  const enableNotifsAndClose = async () => {
    await notifyUser();
    //   .then(() => {
    //   setUserResponded(true);
    // });
  };
  const disableNotifsAndClose = () => {
    // setUserResponded(true);
  };

  return (
    <>
      {!userResponded && !(Notification.permission === "granted") ? (
        <Stack sx={{ width: "100%" }} spacing={5}>
          <Alert
            style={{ alignItems: "center", justifyContent: "center" }}
            severity="info"
            action={
              <Box sx={{ marginLeft: 5 }}>
                <Button
                  color="success"
                  size="medium"
                  style={{
                    textTransform: "capitalize",
                    marginLeft: 10,
                  }}
                  onClick={enableNotifsAndClose}
                >
                  Enable
                </Button>
                <Button
                  color="warning"
                  size="medium"
                  style={{
                    textTransform: "capitalize",
                    marginLeft: 10,
                  }}
                  onClick={disableNotifsAndClose}
                >
                  Do not allowed
                </Button>
              </Box>
            }
          >
            Would you like to enable Notifications?
          </Alert>
        </Stack>
      ) : (
        <></>
      )}
      <div className="card">
        <button
          style={{ border: 0, backgroundColor: "#A3E4D7", color: "#17A589" }}
          onClick={() => {
            notifyUser();
          }}
        >
          Enable Notification
        </button>
      </div>
    </>
  );
}

export default App;

// navigator.permissions.query({ name: "notifications" }).then((result) => {
//   if (result.state === "granted") {
//     console.log("Granted");
//   } else if (result.state === "prompt") {
//     console.log("Prompt");
//   } else if (result.state === "denied") {
//     console.log("Denied");
//   }
//   // Don't do anything if the permission was denied.
// });
