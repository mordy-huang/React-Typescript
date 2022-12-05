import { Modal } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import RenderRouter from "./routes";
import moment from "moment";
import PageHeader from "./components/PageHeader";

let globalErrModal: any = null;

function handleGlobalError(event: ErrorEvent) {
  // debugger;
  event.preventDefault();
  event.stopPropagation();
  console.error(event.error);
  if (globalErrModal == null) {
    const traceId = "C" + Math.random().toString().slice(2, 7);
    try {
      const { message, filename, lineno, colno, error } = event;
      const { message: errorMessage, stack } = error || {};
      const details = { message, filename, lineno, colno, errorMessage, stack };
      //can send message to backend
      // request('/session/log-error', {
      //   method: 'post',
      //   params: { traceId, details: JSON.stringify(details) },
      // }).catch(e => {
      //   console.error(e);
      // });
    } catch (e) {
      console.error(e);
    }
    globalErrModal = Modal.error({
      title: "System Error",
      content: (
        <div>
          An error has occurred. Please try again, and if the problem persists, please contact
          system administrator.
          <div>[{traceId}]</div>
          <div>({moment().format("DD/MM/YYYY h:mm:ssa")})</div>
        </div>
      ),
      onOk: () => {
        globalErrModal = null;
      },
    });
  }
}
window.addEventListener("error", handleGlobalError);
window.onunhandledrejection = (e: PromiseRejectionEvent) => {
  // debugger;
  throw new Error(e.reason.stack);
};

// window.onerror = (msg:any, url:any, line:any, col:any, error:any) => {
//   debugger
//   // Note that col & error are new to the HTML 5 spec and may not be
//   // supported in every browser.  It worked for me in Chrome.
//   let extra = !col ? '' : '\ncolumn: ' + col;
//   extra += !error ? '' : '\nerror: ' + error;

//   // You can view the information in an alert to see things working like this:
//   console.error("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);

//   // TODO: Report this error via ajax so you can keep track
//   //       of what pages have JS issues

//   const suppressErrorAlert = true;
//   // If you return true, then error alerts (like in older versions of
//   // Internet Explorer) will be suppressed.
//   return suppressErrorAlert;
// };

const App = () => {
  return (
    <>
      <PageHeader></PageHeader>
      <RenderRouter></RenderRouter>
    </>
  );
};
export default App;
