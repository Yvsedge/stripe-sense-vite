import HtmlBody from '../imports/dashboard/db.jsx';

export default function DashboardPage() {
  return (
    <div
      className="min-h-screen w-full overflow-x-auto"
      style={{
        background:
          'linear-gradient(90deg, rgb(250, 248, 255) 0%, rgb(250, 248, 255) 100%)',
      }}
    >
      <div className="min-w-[1280px]">
        <HtmlBody />
      </div>
    </div>
  );
}
