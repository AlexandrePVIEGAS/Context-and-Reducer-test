function Profil() {
  return (
    <div className="modal">
      <div className="modal__close"></div>
      <form className="modal__infos">
        <div className="modal__photo">
          <input type="file" name="profil_image" id="profil_image" />
          <label htmlFor="profil_image"></label>
        </div>
        <div className="modal__firstname">
          <span>Prénom : </span>
          <input type="text" name="" id="" />
        </div>
        <div className="modal__lastname">
          <span>Nom : </span>
          <input type="text" name="" id="" />
        </div>
        <div className="modal__email">
          <span>Email : </span>
          <input type="email" name="" id="modal__email--input" disabled />
        </div>
        <div className="modal__save">
          <input type="submit" name="modal__save" id="modal__save" value="Enregistrer" />
        </div>
        <button className="modal__delete_account">Désactiver le compte</button>
      </form>
    </div>
  );
}

export default Profil;
