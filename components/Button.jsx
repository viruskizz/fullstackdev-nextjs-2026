export default function Button({ title }) {
    const className = {
        button: 'bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow'
    }
    return (
        <button className={className.button}>
            {title}
        </button>

    )
}