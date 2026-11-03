import HtmlBody from '../imports/history/hs.jsx';

export default function History() {
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
