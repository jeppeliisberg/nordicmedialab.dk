import Divider from "../components/Divider";
import MembersSwiper from "../components/MembersSwiper";
import ProjectsSwiper from "../components/ProjectsSwiper";
import { useTranslation, Trans } from 'react-i18next';

const Main = () => {
    const { t } = useTranslation();

    const projectsData = t('projects.cards', { returnObjects: true });
    const membersData = t('members.cards', { returnObjects: true });
   
    return (
        <>
            <section className="relative mt-10 pb-32">
                <a className="anchor" id="hvorfor"></a>
                <div className="relative px-10 max-w-2xl mx-auto">
                    <span className="text-emerald-500 font-semibold uppercase text-base font-sans">{t('hero.tagline')}</span>
                    <h1 className="font-serif text-3xl lg:text-5xl font-bold mt-1 mb-5">{t('hero.title')}</h1>
                    <p className="font-serif text-lg lg:text-2xl">{t('hero.paragraph1')}</p>
                    <p className="font-serif text-lg lg:text-2xl mt-5">
                        <Trans i18nKey="hero.paragraph2">
                            Derfor har vi lanceret Nordic Media Lab: Et teknologi-laboratorium forankret i <a href="#values" className="underline">tre nordiske værdier</a>: oplysning, tillid, sammenhængskraft.
                        </Trans>
                    </p>

                    <p className="font-serif text-lg lg:text-2xl mt-5">{t('hero.paragraph3')}</p>

                    <div className="flex w-full lg:-mt-5 justify-end">
                        <img src="nml-wood.png" className="w-20 lg:w-24"/>
                    </div>
                    <ul className="flex flex-col gap-y-2">
                        <li className="font-sans font-bold text-sm">{t('hero.visitUs')}</li>
                        <li><a href="https://oase.app/oase/46ec46bf-5445-4a32-bb21-ada8a61b4b0a/join/8f84eb1a-1e07-478c-9153-6e21850141fe" className="text-emerald-500 text-xl">{t('hero.joinOase')}</a></li>
                        <li><a href="https://duckling.co" className="text-emerald-500 text-xl">Duckling</a></li>
                        <li><a href="https://zensocial.dk" className="text-emerald-500 text-xl">Zen Social</a></li>
                        <li><a href="https://meningspunktet.dk" className="text-emerald-500 text-xl">Meningspunktet</a></li>
                    </ul>
                </div>
            </section>
            <Divider backgroundColor="#FEFBF3" />
            <section className="bg-[#FEFBF3] pb-32">
                <a className="anchor" id="projekter"></a>
                <div className="relative px-10 max-w-2xl mx-auto">
                    <span className="text-emerald-500 font-semibold uppercase text-base font-sans">{t('projects.tagline')}</span>
                    <h1 className="font-serif text-xl lg:text-2xl font-normal mt-1 mb-5">{t('projects.description1')}</h1>
                    <h1 className="font-serif text-xl lg:text-2xl font-normal mt-1 mb-5">{t('projects.description2')}</h1>
                </div>
                <div className="w-full mt-20">
                    <ProjectsSwiper cards={projectsData}/>
                </div>
            </section>
            
            <Divider backgroundColor="#39A97C" />
            <section className="bg-[#39A97C] pb-32">
                <a className="anchor" id="medlemmer"></a>
                <div className="relative px-10 max-w-2xl mx-auto">
                    <span className="text-white font-semibold uppercase text-base font-sans">{t('members.tagline')}</span>
                    <h1 className="font-serif text-3xl lg:text-5xl font-bold mt-1 mb-5">{t('members.title')}</h1>
                    <p className="font-serif text-xl lg:text-2xl">
                        <Trans i18nKey="members.description">
                            Som iværksætter kan du blive medlem og få adgang til infrastruktur, viden, netværk og investering. Du skal underskrive vores Nordic Media Pagt og bidrage til projekter. Skriv til <a href="mailto:hej@nordicmedialab.dk" className="underline hover:text-white">hej@nordicmedialab.dk</a> for at høre mere.
                        </Trans>
                    </p>
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
                    <span className="text-[#39A97C] font-semibold uppercase text-base font-sans">{t('pact.tagline')}</span>
                    <h1 className="font-serif text-3xl lg:text-5xl font-bold mt-1 mb-10">{t('pact.title')}</h1>
                    <ul className="flex flex-col gap-y-10">
                        <li>
                            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2">{t('pact.mainTitle')}</h2>
                            <p className="font-serif text-base lg:text-lg">{t('pact.mainDescription')}</p>
                        </li>
                        <li>
                            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2">{t('pact.transparency.title')}</h2>
                            <p className="font-serif text-base lg:text-lg">{t('pact.transparency.description')}</p>
                        </li>
                        <li>
                            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2">{t('pact.design.title')}</h2>
                            <p className="font-serif text-base lg:text-lg">{t('pact.design.description')}</p>
                        </li>
                        <li>
                            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2">{t('pact.ownership.title')}</h2>
                            <p className="font-serif text-base lg:text-lg">{t('pact.ownership.description')}</p>
                        </li>
                        <li>
                            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2">{t('pact.beliefs.title')}</h2>
                            <ul className="list-disc list-outside font-serif text-base lg:text-lg ml-6">
                                <li>{t('pact.beliefs.items.0')}</li>
                                <li>{t('pact.beliefs.items.1')}</li>
                                <li>{t('pact.beliefs.items.2')}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </section>
            <Divider backgroundColor="#fff" />
            
            <section className="bg-white pb-32 overflow-hidden">
                <a className="anchor" id="values"></a>
                <div className="relative px-10 max-w-2xl mx-auto">
                    <span className="text-[#39A97C] font-semibold uppercase text-base font-sans">{t('values.tagline')}</span>
                    <h1 className="font-serif text-3xl lg:text-5xl font-bold mt-1 mb-10">{t('values.title')}</h1>
                    <ol className="list-decimal list-outside ml-6 lg:ml-8 [&_li]:marker:text-2xl lg:[&_li]:marker:text-3xl [&_li]:marker:font-bold flex flex-col gap-y-10">
                        <li>
                            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2">{t('values.enlightenment.title')}</h2>
                            <p className="font-serif text-base lg:text-lg">{t('values.enlightenment.description')}</p>
                        </li>
                        <li className="relative">
                            <img src="wood_2.svg" className="absolute -right-20 top-0 w-20 h-auto"/>
                            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2">{t('values.trust.title')}</h2>
                            <p className="font-serif text-base lg:text-lg">{t('values.trust.description')}</p>
                        </li>
                        <li className="relative">
                            <img src="wood_3.svg" className="absolute -left-24 lg:-left-32 top-0 w-20 h-auto"/>
                            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2">{t('values.cohesion.title')}</h2>
                            <p className="font-serif text-base lg:text-lg">{t('values.cohesion.description')}</p>
                        </li>
                    </ol>
                    <div className="block w-full h-px bg-black my-10"></div>
                    <h1 className="font-serif text-3xl lg:text-5xl font-medium mt-1 mb-10">{t('values.inspirationTitle')}</h1>
                    <ul className="list-disc list-outside font-serif text-base lg:text-lg ml-6">
                        <li>
                            <Trans i18nKey="values.inspiration.folkHighSchool">
                                <span className="font-bold">Højskolebevægelsen</span> skabte rum for livslang læring, refleksion og personlig dannelse – ikke kun for eliten, men for alle. Bevægelsen blev også en del af grundlaget for den nordiske velfærdsmodel.
                            </Trans>
                        </li>
                        <li>
                            <Trans i18nKey="values.inspiration.cooperative">
                                <span className="font-bold">Andelsbevægelsen</span> viste, at man kan bygge stærke økonomier og strukturer gennem fællesskab og delt ansvar – og stadig have plads til kapitalistiske forretningsmodeller.
                            </Trans>
                        </li>
                    </ul>
                </div>
            </section>
            <Divider backgroundColor="#39A97C" />
            <section className="bg-[#39A97C] pb-32">
                <a className="anchor" id="team"></a>
                <div className="relative px-10 max-w-2xl mx-auto">
                    <h1 className="font-serif text-3xl lg:text-5xl font-bold mt-1 mb-5">{t('team.title')}</h1>
                </div>
                <div className="max-w-7xl mx-auto px-5">
                <img src="people.png" className="w-full h-auto"/>
                </div>
            </section>
            <Divider backgroundColor="#FEFBF3" />
            <section className="bg-[#FEFBF3] pb-32">
                <a className="anchor" id="kontakt"></a>
                <div className="relative px-10 max-w-2xl mx-auto">
                    <span className="text-emerald-500 font-semibold uppercase text-base font-sans">{t('contact.tagline')}</span>
                    <h1 className="font-serif font-bold text-2xl lg:text-3xl">{t('contact.title')}</h1>
                    <a href="mailto:hej@nordicmedialab.dk" className="block text-xl xl:text-5xl font-sans my-10">hej@nordicmedialab.dk</a>
                </div>
            </section>
        </>
    )
}

export default Main;