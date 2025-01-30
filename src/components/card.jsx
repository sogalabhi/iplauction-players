const Card = ({ children }) => (
    <div className="bg-white/10 backdrop-blur-lg shadow-md rounded-xl p-4">{children}</div>
);

const CardContent = ({ children }) => <div className="p-2">{children}</div>;

export { Card, CardContent };
