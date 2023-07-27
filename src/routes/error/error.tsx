import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

// import styles from "./error.module.css";

function statusToMessage(status: number, internal: boolean, defaultMsg: string): string {
  if (internal) {
    switch (status) {
      case 404:
        return "No page with the URL given found.";
        break;
      default:
        return defaultMsg;
    }
  } else {
    return defaultMsg;
  }
}

interface ErrorData {
  status?: number;
  statusText?: string;
  internal?: boolean;

  message: string;
}

export default function ErrorBoundary() {
  // const error = null;

  const errorData: ErrorData = {
    message: "",
  };

  // if (isRouteErrorResponse(error)) {
  //   errorData.status = error.status;
  //   errorData.statusText = error.statusText;
  //   errorData.message = error.data;
  //   errorData.internal = error.internal;
  // } else if (error instanceof Error) {
  //   errorData.statusText = error.name;
  //   errorData.message = error.message;
  // } else if (typeof error === "string") {
  //   errorData.message = error;
  // } else {
  //   errorData.message = "Unknown error";
  // }

  return (
    <>
      <Navbar />

      <main class="main">
        <h1 class="main__heading">Error {errorData.status ? errorData.status : errorData.statusText || ""}</h1>
        <p class="main__paragraph">{errorData.status ? statusToMessage(errorData.status, errorData.internal!, errorData.message) : errorData.message}</p>
      </main>

      <Footer />
    </>
  );
}
