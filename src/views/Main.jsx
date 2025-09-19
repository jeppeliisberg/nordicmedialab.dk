import Divider from "../components/Divider";
import IndustryMembersSwiper from "../components/IndustryMembersSwiper";
import MembersSwiper from "../components/MembersSwiper";
import ProjectsSwiper from "../components/ProjectsSwiper";
import cardsData from '../components/cardsData.json';
import membersData from '../components/membersData.json';
import industryMembersData from '../components/industryMembersData.json';
const Main = () => {
   
    return (
        <>
            <section className="relative mt-10 pb-32">
                <a className="anchor" id="hvorfor"></a>
                <div className="relative px-10 max-w-2xl mx-auto">
                    <span className="text-emerald-500 font-semibold uppercase text-base font-sans">Hvorfor?</span>
                    <h1 className="font-serif text-3xl lg:text-5xl font-bold mt-1 mb-5">Vil du være med til at bygge en verden, hvor teknologi og data tjener mennesker og ikke omvendt?</h1>
                    <p className="font-serif text-lg lg:text-2xl">I dag kontrolleres og monopoliseres vores digitale infrastruktur af få tech-giganter. Men lige nu har vi en unik mulighed for at ændre det. Der er politisk vilje og folkelig opmærksomhed til at gøre noget andet.</p>
                    <p className="font-serif text-lg lg:text-2xl mt-5">Derfor har vi lanceret Nordic Media Lab: Et teknologi-laboratorium forankret i <a href="#values" className="underline">tre nordiske værdier</a>: oplysning, tillid, sammenhængskraft.</p>
                    
                    <p className="font-serif text-lg lg:text-2xl mt-5">Vi samler iværksættere og ildsjæle, som bygger fremtidens infrastruktur. Vi bygger ikke mod Big Tech - vi bygger udenom. Vores vision er at gøre Norden til globalt forbillede for en fremtid, hvor teknologi tjener mennesker og ikke omvendt.</p>
                    
                    <div className="flex w-full lg:-mt-5 justify-end">
                        <img src="nml-wood.png" className="w-20 lg:w-24"/>
                    </div>
                    <ul className="flex flex-col gap-y-2">
                        <li className="font-sans font-bold text-sm">Besøg os her:</li>
                        <li><a href="https://oase.app/oase/46ec46bf-5445-4a32-bb21-ada8a61b4b0a/join/8f84eb1a-1e07-478c-9153-6e21850141fe" className="text-emerald-500 text-xl">Deltag i vores Oase Techtopia chat</a></li>
                        <li><a href="https://duckling.co" className="text-emerald-500 text-xl">Duckling</a></li>
                        <li><a href="https://zensocial.dk" className="text-emerald-500 text-xl">ZenSocial</a></li>
                        <li><a href="https://meningspunktet.dk" className="text-emerald-500 text-xl">Meningspunktet</a></li>
                    </ul>
                </div>
            </section>
            <Divider backgroundColor="#FEFBF3" />
            <section className="bg-[#FEFBF3] pb-32">
                <a className="anchor" id="projekter"></a>
                <div className="relative px-10 max-w-2xl mx-auto">
                    <span className="text-emerald-500 font-semibold uppercase text-base font-sans">Projekter</span>
                    <h1 className="font-serif text-xl lg:text-2xl font-normal mt-1 mb-5">Vi fungerer som paraply og koordinator for en række tech-projekter, der fokuserer på udvikling, research og oplysning.</h1>
                    <h1 className="font-serif text-xl lg:text-2xl font-normal mt-1 mb-5">Læs mere om vores projekter herunder:</h1>
                </div>
                <div className="w-full mt-20">
                    <ProjectsSwiper cards={cardsData}/>
                </div>
            </section>
            
            <Divider backgroundColor="#39A97C" />
            <section className="bg-[#39A97C] pb-32">
                <a className="anchor" id="medlemmer"></a>
                <div className="relative px-10 max-w-2xl mx-auto">
                    <span className="text-white font-semibold uppercase text-base font-sans">Medlemmer</span>
                    <h1 className="font-serif text-3xl lg:text-5xl font-bold mt-1 mb-5">Iværksætter medlemmer</h1>
                    <p className="font-serif text-xl lg:text-2xl">Som iværksætter kan du blive medlem og få adgang til infrastruktur, viden, netværk og investering. Du skal underskrive vores Nordic Media Pagt og bidrage til projekter. Skriv til <a href="mailto:hej@nordicmedialab.dk" className="underline hover:text-white">hej@nordicmedialab.dk</a> for at høre mere.</p>
                </div>
                <div className="w-full my-20">
                    <MembersSwiper cards={membersData}/>
                </div>
                {/**
                <div className="relative px-10 max-w-2xl mx-auto">
                    <h1 className="font-serif text-3xl lg:text-5xl font-bold mt-1 mb-5">Industri medlemmer</h1>
                    <p className="font-serif text-xl lg:text-2xl">Støtter med et fast årligt beløb, og får adgang til eksklusive events, IP udviklet i vores lab, og netværk af startups. Kan bruge Nordic Media Lab badge i deres markedsføring. Skriv til industry@nordicmedialab.dk for at høre mere.</p>    
                </div>
                <div className="w-full my-20">
                    <IndustryMembersSwiper cards={industryMembersData}/>
                </div>
                */}

            </section>
            
            <Divider backgroundColor="#1d1f2a" />
            
            <section className="bg-[#1d1f2a] pb-32">
                <a className="anchor" id="pagt"></a>
                <div className="relative px-10 max-w-2xl mx-auto text-white">
                    <span className="text-[#39A97C] font-semibold uppercase text-base font-sans">Vores pagt</span>
                    <h1 className="font-serif text-3xl lg:text-5xl font-bold mt-1 mb-10">For at være iværksætter-medlem skal man underskrive og overholde vores fælles pagt:</h1>
                    <ul className="flex flex-col gap-y-10">
                        <li>
                            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2">Nordic Media Pagt</h2>
                            <p className="font-serif text-base lg:text-lg">Ved at underskrive denne pagt erklærer vi, at vi arbejder for at udvikle og understøtte teknologi, der sætter mennesket før maskinen, fællesskab og privatliv før profit, og gennemsigtighed før manipulation. Vi bliver dermed en del af Nordic Media Lab. Vi forpligter os til:</p>
                        </li>
                        <li>
                            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2">Transparente forretningsmodeller</h2>
                            <p className="font-serif text-base lg:text-lg">Vi arbejder for, at vores forretningsmodeller er åbne, forståelige og retfærdige. Brugerne skal kende vilkårene - og have reel magt over deres egne data. Vores løsninger skal give mennesker kontrol, ikke blot samtykkebokse.</p>
                        </li>
                        <li>
                            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2">Design med samvittighed</h2>
                            <p className="font-serif text-base lg:text-lg">Vi bygger ikke teknologi for teknologiens skyld. Vi designer med mennesker i centrum - med respekt for deres opmærksomhed, trivsel og værdighed. Brugere skal kunne gennemskue, hvordan designet påvirker dem og have mulighed for at ændre det. Vi bygger på protokoller, standarder og teknologi, hvor data kan udveksles og flyttes frit mellem platforme og tjenester.</p>
                        </li>
                        <li>
                            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2">Organisering og ejerskab</h2>
                            <p className="font-serif text-base lg:text-lg">Vi vil arbejde for en organisering og et ejerskab, som understøtter transparante forretningsmodeller og samvittighedsfuldt design. Det indebærer, at vi vil gøre alt for at sikre, at vores projekt eller virksomhed ikke kan sælges til ejere, som arbejder imod Nordic Media Pagt. Det kan f.eks være via fondsejerskab eller ved at stifte et anpartsselskab, men kan have mange andre former.</p>
                        </li>
                        <li>
                            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2">Vi tror på:</h2>
                            <ul className="list-disc list-outside font-serif text-base lg:text-lg ml-6">
                                <li>At demokratisk infrastruktur er en forudsætning for et frit og oplyst samfund.</li>
                                <li>At fælleseje og samarbejde skaber stærkere og mere retfærdige løsninger.</li>
                                <li>At langsigtethed og ansvar må vinde over kortsigtet vækst.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </section>
            <Divider backgroundColor="#fff" />
            
            <section className="bg-white pb-32 overflow-hidden">
                <a className="anchor" id="values"></a>
                <div className="relative px-10 max-w-2xl mx-auto">
                    <span className="text-[#39A97C] font-semibold uppercase text-base font-sans">Værdier</span>
                    <h1 className="font-serif text-3xl lg:text-5xl font-bold mt-1 mb-10">Vi er baseret på tre nordiske værdier:</h1>
                    <ol className="list-decimal list-outside ml-6 lg:ml-8 [&_li]:marker:text-2xl lg:[&_li]:marker:text-3xl [&_li]:marker:font-bold flex flex-col gap-y-10">
                        <li>
                            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2">Oplysning</h2>
                            <p className="font-serif text-base lg:text-lg">Vi tror på, at teknologi og digital infrastruktur skal bygge på indsigt, dannelse og kritisk tænkning. Vi arbejder for en oplyst offentlighed, hvor vi som borgere forstår og kan påvirke de systemer, der former vores hverdag – også de digitale.</p>
                        </li>
                        <li className="relative">
                            <img src="wood_2.svg" className="absolute -right-20 top-0 w-20 h-auto"/>
                            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2">Tillid</h2>
                            <p className="font-serif text-base lg:text-lg">Vi mener, at teknologi skal være et redskab for fællesskab, trivsel og bæredygtig udvikling. Vi stiller krav til, hvordan teknologi designes, hvem den gavner – og hvem der ekskluderes. Vi understøtter foreningsliv og andre fællesskaber. Vi bygger digitale fællesskaber, som understøtter de fysiske fællesskaber.</p>
                        </li>
                        <li className="relative">
                            <img src="wood_3.svg" className="absolute -left-24 lg:-left-32 top-0 w-20 h-auto"/>
                            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2">Sammenhængskraft</h2>
                            <p className="font-serif text-base lg:text-lg">Vi bygger digital infrastruktur, der tænker i helheder, og som gavner både menneskelige systemer og naturens økosystemer. Vi tror på, at åbenhed, transparens og medskabelse skaber bedre systemer.</p>
                        </li>
                    </ol>
                    <div className="block w-full h-px bg-black my-10"></div>
                    <h1 className="font-serif text-3xl lg:text-5xl font-medium mt-1 mb-10">Inspiration:</h1>
                    <ul className="list-disc list-outside font-serif text-base lg:text-lg ml-6">
                        <li><span className="font-bold">Højskolebevægelsen</span> skabte rum for livslang læring, refleksion og personlig dannelse – ikke kun for eliten, men for alle. Bevægelsen blev også en del af grundlaget for den nordiske velfærdsmodel.</li>
                        <li><span className="font-bold">Andelsbevægelsen</span> viste, at man kan bygge stærke økonomier og strukturer gennem fællesskab og delt ansvar – og stadig have plads til kapitalistiske forretningsmodeller.</li>
                    </ul>
                </div>
            </section>
            <Divider backgroundColor="#39A97C" />
            <section className="bg-[#39A97C] pb-32">
                <a className="anchor" id="team"></a>
                <div className="relative px-10 max-w-2xl mx-auto">
                    <h1 className="font-serif text-3xl lg:text-5xl font-bold mt-1 mb-5">Vi er startet og ledet af en lille gruppe ildsjæle og iværksættere</h1>                    
                </div>
                <div className="max-w-7xl mx-auto px-5">
                <img src="people.png" className="w-full h-auto"/>
                </div>
            </section>
            <Divider backgroundColor="#FEFBF3" />
            <section className="bg-[#FEFBF3] pb-32">
                <a className="anchor" id="organisering"></a>
                <div className="relative px-10 max-w-2xl mx-auto">
                    <span className="text-emerald-500 font-semibold uppercase text-base font-sans">Organisering</span>
                    <h1 className="font-serif font-bold text-2xl lg:text-3xl">Vi arbejder for at etablere Nordic Media Lab som en non-profit med et ejerskab, som sikrer vores værdier og mission. Vi er i process med at afgøre, om vi skal registreres som fond, kooperativ eller forening, eller et miks. Stay tuned...</h1>
                </div>
            </section>
            <Divider backgroundColor="#FEFBF3" />
            <section className="bg-[#FEFBF3] pb-32">
                <a className="anchor" id="kontakt"></a>
                <div className="relative px-10 max-w-2xl mx-auto">
                    <span className="text-emerald-500 font-semibold uppercase text-base font-sans">Kontakt</span>
                    <h1 className="font-serif font-bold text-2xl lg:text-3xl">Skriv til os</h1> 
                    <a href="mailto:hej@nordicmedialab.dk" className="block text-xl xl:text-5xl font-sans my-10">hej@nordicmedialab.dk</a>
                </div>
            </section>
        </>
    )
}

export default Main;