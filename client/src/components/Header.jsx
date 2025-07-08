import logo from '/logo.png';

function Header() {
  return (
    <header className="flex items-center justify-center mb-8">
      <img src={logo} alt="Task Manager Logo" className="h-10 w-10 mr-2" />
      <h1 className="text-3xl font-bold text-primary" tabIndex="0">
        Task Manager
      </h1>
    </header>
  );
}

export default Header;
