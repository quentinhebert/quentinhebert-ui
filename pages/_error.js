function Error({ statusCode }) {
  switch (statusCode) {
    case 401:
      return <p>HOLA MAGGLE CUSTOM ERROR 401</p>;
    default:
      break;
  }
  return (
    <p>{statusCode ? `STATUS CODE CUSTOM ERROR PAGE ${statusCode}` : ""}</p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
