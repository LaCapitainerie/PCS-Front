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
                            src="https://media.discordapp.net/attachments/597782659430613002/1240634715304890399/PetitLogo.png?ex=6647469e&is=6645f51e&hm=8c1a9e0ed74f2db3433556609f074423a43db351b808038da01e1a9272ef1cba&=&format=webp&quality=lossless"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h5>Paris Caretaker Services</h5>
                        <h6>Travail Famille Patrie</h6>
                    </div>
                </div>
                
                
                
                <div className="flex flex-col">
                    <h5 className="font-bold">Mentions Légales</h5>
                    <h6><a>Conditions d’utilisation générale</a></h6>
                    <h6><a>Mention Légale</a></h6>
                    <h6><a>Politique en matière de cookies</a></h6>
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
                    <h6></h6>
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