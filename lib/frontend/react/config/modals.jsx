

let rand = (Math.floor(Math.random() * 20) - 10);

export const modalConfig = {
                 rand: rand,
                 backdropStyle: { position: 'fixed',  zIndex: 1040, top: 0, bottom: 0, left: 0, right: 0, zIndex: 'auto', backgroundColor: '#000', opacity: 0.5 }
   }

 export const dialogStyle = function() {
      let top = 50 + rand;
      let left = 50 + rand;
      return {
        position: 'absolute',
        width: 400,
        top: top + '%', left: left + '%',
        transform: `translate(-${top}%, -${left}%)`,
        border: '1px solid #e5e5e5',
        backgroundColor: 'white',
        boxShadow: '0 5px 15px rgba(0,0,0,.5)',
        padding: 20
      }
    }


