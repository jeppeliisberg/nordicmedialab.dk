import Divider from "../components/Divider";
import MembersGrid from "../components/MembersGrid";
import BoardSlider from "../components/BoardSlider";
import MemberSubmit from "../components/MemberSubmit";
import boardData from "../components/boardData.json";
import { useTranslation, Trans } from 'react-i18next';

const Main = () => {
    const { t } = useTranslation();

    const membersData = t('members.cards', { returnObjects: true });
   
    return (
        <>
            <section className="relative mt-10 pb-32">
                <a className="anchor" id="hvorfor"></a>
                <div className="relative px-10 max-w-2xl mx-auto">
                    <span className="text-emerald-500 font-semibold uppercase text-base font-sans">{t('hero.tagline')}</span>
                    <h1 className="font-serif text-3xl lg:text-5xl font-bold mt-1 mb-5">{t('hero.title')}</h1>
                    <p className="font-serif text-lg lg:text-2xl">{t('hero.paragraph1')}</p>
                    <p className="font-serif text-lg lg:text-2xl mt-5">{t('hero.paragraph2')}</p>

                    <div className="flex w-full lg:-mt-5 justify-end">
                        <img src="nml-wood.png" className="w-20 lg:w-24"/>
                    </div>
                </div>
            </section>
            <Divider backgroundColor="#FEFBF3" />
            <section className="bg-[#FEFBF3] pb-32">
                <a className="anchor" id="projekter"></a>
                <div className="relative px-10 max-w-2xl mx-auto">
                    <span className="text-[#39A97C] font-semibold uppercase text-base font-sans tracking-wide">{t('projects.tagline')}</span>
                    <h1 className="font-serif text-3xl lg:text-5xl font-bold mt-2 mb-6">{t('projects.title')}</h1>
                    <p className="font-serif text-lg lg:text-xl leading-relaxed">{t('projects.intro1')}</p>
                    <p className="font-sans text-base lg:text-lg text-neutral-700 mt-5 leading-relaxed">{t('projects.intro2')}</p>
                </div>

                <div className="relative px-10 max-w-2xl mx-auto mt-12 flex flex-col gap-4">
                    <article className="bg-white border border-black/10 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 sm:grid-cols-[120px_1fr]">
                        <div className="bg-[#39A97C] text-white flex sm:flex-col flex-row items-center justify-center gap-x-3 text-center py-5 sm:py-7 px-4">
                            <span className="text-xs uppercase tracking-wide opacity-90">{t('projects.w1dow')}</span>
                            <span className="font-serif text-5xl font-extrabold leading-none">{t('projects.w1day')}</span>
                            <span className="text-sm uppercase tracking-widest">{t('projects.w1mon')}</span>
                            <span className="text-xs opacity-80">{t('projects.w1year')}</span>
                        </div>
                        <div className="px-7 py-6">
                            <span className="inline-block text-xs font-semibold uppercase tracking-wide text-[#39A97C] bg-[#39A97C]/10 rounded-full px-3 py-1 mb-3">{t('projects.w1tag')}</span>
                            <h2 className="font-serif text-2xl lg:text-3xl font-bold leading-tight">{t('projects.w1title')}</h2>
                            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 mb-3 text-sm text-neutral-600 font-sans">
                                <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF881B]"></span>{t('projects.w1time')}</span>
                                <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF881B]"></span>{t('projects.w1location')}</span>
                            </div>
                            <p className="font-sans text-base text-neutral-700">{t('projects.w1desc')}</p>
                        </div>
                    </article>

                    <article className="border border-dashed border-black/15 rounded-3xl overflow-hidden grid grid-cols-1 sm:grid-cols-[120px_1fr]">
                        <div className="flex sm:flex-col flex-row items-center justify-center gap-x-3 text-center py-4 sm:py-7 px-4 text-neutral-400 sm:border-r border-dashed border-black/15">
                            <span className="text-sm uppercase tracking-widest">{t('projects.w2when')}</span>
                        </div>
                        <div className="px-7 py-5">
                            <span className="inline-block text-xs font-semibold uppercase tracking-wide text-neutral-500 bg-black/5 rounded-full px-3 py-1 mb-2">{t('projects.w2tag')}</span>
                            <h2 className="font-serif text-xl font-bold text-neutral-500 leading-tight">{t('projects.w2title')}</h2>
                            <p className="font-sans text-sm text-neutral-500 mt-1">{t('projects.w2note')}</p>
                        </div>
                    </article>

                    <div className="mt-8">
                        <MemberSubmit variant="link" triggerLabel={t('projects.applyLink')} />
                    </div>
                </div>
            </section>
            
            <Divider backgroundColor="#39A97C" />
            <section className="bg-[#39A97C] pb-32">
                <a className="anchor" id="medlemmer"></a>
                <div className="relative px-10 max-w-2xl mx-auto">
                    <span className="text-white font-semibold uppercase text-base font-sans">{t('members.tagline')}</span>
                    <h1 className="font-serif text-3xl lg:text-5xl font-bold mt-1 mb-5">{t('members.title')}</h1>
                    <p className="font-serif text-xl lg:text-2xl mb-8">{t('members.description')}</p>
                    <MemberSubmit/>
                </div>
                <div className="max-w-6xl mx-auto px-6 md:px-10 mt-14">
                    <MembersGrid cards={membersData}/>
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
                <div className="relative px-10 max-w-2xl mx-auto text-white">
                    <span className="text-white/80 font-semibold uppercase text-base font-sans tracking-wide">{t('team.tagline')}</span>
                    <h1 className="font-serif text-3xl lg:text-5xl font-bold mt-1 mb-6">{t('team.title')}</h1>
                    <div className="flex flex-col gap-4">
                        <p className="font-serif text-lg lg:text-2xl">{t('team.story1')}</p>
                        <p className="font-serif text-lg lg:text-2xl">{t('team.story2')}</p>
                        <p className="font-serif text-lg lg:text-2xl">{t('team.story3')}</p>
                        <p className="font-serif text-lg lg:text-2xl">{t('team.story4')}</p>
                    </div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-bold mt-16 mb-8">{t('team.boardTitle')}</h2>
                </div>
                <BoardSlider members={boardData}/>
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