export default function PasteURLForm(props) {
    const { actors, handleFormSubmit, actorURL, setActorURL, setBackground, background } = props;

    return (
        <>
            <div className='m-8'>
                <p className='text-white text-6xl'>Actor Widgets</p>
            </div>
            <div className="flex justify-center items-center space-x-2 my-3">
                <label className='text-white font-bold'>Set Chroma Key Color:</label>
                <input className='input input-bordered border-primary h-10 w-20' type="color" value={background} onChange={(evt) => setBackground(evt.target.value)} />
            </div>
            <section className={actors && actors.length && 'hidden'}>
                <form onSubmit={(evt) => handleFormSubmit(evt)}>
                    <input className='input input-bordered border-primary' value={actorURL} onChange={(evt) => setActorURL(evt.target.value)} placeholder='Paste Link Here' />
                    <button type="submit" className='btn btn-primary btn-sm mx-2'>Submit</button>
                </form>
            </section>
        </>
    );
}