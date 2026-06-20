function Card({ imgUrl, title, description, children }) {
  // const { imgUrl } = props;

  const className = {
    card: 'card flex flex-row rounded-2xl shadow-md overflow-hidden bg-white max-w-2xl mt-3',
    img: 'w-36 h-full object-cover',
    cardBody: 'card-body flex flex-col justify-between flex-1 p-6 text-left',
    title: 'text-xl font-bold mb-2 text-black text-left',
    description: 'text-gray-600 text-left',
  }

  return (
    <div className={className.card}>
      <img src={imgUrl} className={className.img} />
      <div className={className.cardBody}>
        <div>
          <h3 className={className.title}>{title}</h3>
          <p className={className.description}>{description}</p>
        </div>
          {/* <button className={className.button}>
            Watch
          </button> */}
          {children}
      </div>
    </div>
  );
}
export default Card
