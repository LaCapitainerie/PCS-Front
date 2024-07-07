export function Footer() {
    return (
      <footer className="pb-8">
          <div className="flex flex-col">
              <div id="footer" className="flex flex-row justify-evenly">
                  <div className="flex flex-row gap-4">
                      <div className="border">
                          <img 
                              alt="logo"
                              className="w-32 h-32 rounded-lg object-cover"
                              src={`${process.env.NEXT_PUBLIC_ICON_URL}`}
                          />
                      </div>
                      <div className="flex flex-col justify-center">
                          <h5>Paris Caretaker Services</h5>
                          <h6></h6>
                      </div>
                  </div>
                  
                  
                  
                  <div className="flex flex-col">
                      <h5 className="font-bold">Politique et confidentialité</h5>
                      <h6><a href="mentions_legales/CGU.pdf">Mentions Légales</a></h6>
                      <h6><a href="documents/CGU.pdf">Conditions d’utilisation générale</a></h6>
                      <h6><a href="documents/politique_cookies">Politique en matière de cookies</a></h6>
                  </div>
                  <div className="flex flex-col">
                      <h5 className="font-bold">A propos</h5>
                      <h6><a>Blog</a></h6>
                      <h6><a>Contact</a></h6>
                      <h6><a>Service 3</a></h6>
                  </div>
                  <div className="flex flex-col">
                      <h5 className="font-bold">Contact</h5>
                      <h6>Paris Caretaker Services</h6>
                      <h6>contact@pariscaretaker.com</h6>
                      <h6></h6>
                  </div>
              </div>
              <div className="flex items-strech justify-center">
                  <h6>© 2024 Paris Caretaker Services. Tous droits réservés.</h6>
              </div>
          </div>
      </footer>
    )
  }