import dayjs from "dayjs";

function EventLogsModal({ logs, selectedTimezone }) {
  return (
    <div>
      {logs.map((log, index) => (
        <div key={index}>
          <p>{log.message}</p>
          <small>
            {dayjs.utc(log.timestamp).tz(selectedTimezone).format("MMM DD, YYYY hh:mm A")}
          </small>
        </div>
      ))}
    </div>
  );
}

export default EventLogsModal;
