export const InputField = ({ title, setTitle, handleSubmit }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                />
                <button>Add Todo</button>
            </form>
        </>
    );
};
