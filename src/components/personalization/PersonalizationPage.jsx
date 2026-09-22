"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleDot,
  Compass,
  Flower2,
  Heart,
  House,
  Leaf,
  Moon,
  Paintbrush,
  RotateCcw,
  Search,
  Shirt,
  ShoppingBag,
  Sparkles,
  Sun,
  Users,
  X,
} from "lucide-react";
import Button from "../ui/Button";
import SeasonExplorer from "./SeasonExplorer";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { getCopy } from "../../i18n/personalization/copy";
import {
  ASSET_ROOT,
  getItem,
  items,
  placeItem,
  zones,
} from "../../data/personalization/catalog";
import { usePersonalization } from "./PreviewContext";

const paths = {
  profile: "/app/personalize",
  character: "/app/personalize/character",
  shop: "/app/personalize/shop",
  space: "/app/personalize/space",
  season: "/app/personalize/season",
};
const navIcons = {
  profile: CircleDot,
  character: Shirt,
  shop: ShoppingBag,
  space: House,
  season: Sun,
};


function Art({ name, size = 512, alt = "", className = "", eager = false, c }) {
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  if (failed)
    return (
      <div className={"pv-art-error " + className}>
        <span>
          {c("imageFailed")}: {alt}
        </span>
        <button
          type="button"
          onClick={() => {
            setAttempt(attempt + 1);
            setFailed(false);
          }}
        >
          {c("retryImage")}
        </button>
      </div>
    );
  return (
    <img
      key={attempt}
      className={className}
      src={ASSET_ROOT + name + "-" + size + ".webp"}
      alt={alt}
      width={size}
      height={name === "courtyard" ? 640 : name === "season" ? 540 : size}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

function ActionLink({ href, children, secondary = false, ...props }) {
  return (
    <Link
      href={href}
      className={"pv-action" + (secondary ? " pv-action-secondary" : "")}
      {...props}
    >
      {children}
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}

function Dialog({ title, onClose, children, c }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const trigger = document.activeElement;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      trigger?.focus?.();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="pv-dialog"
      aria-labelledby="pv-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="pv-dialog-inner">
        <div className="pv-dialog-header">
          <h2 id="pv-dialog-title">{title}</h2>
          <button
            type="button"
            className="pv-icon-button"
            onClick={onClose}
            aria-label={c("close")}
            autoFocus
          >
            <X aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}

function Scene({
  scene,
  c,
  interactive = false,
  selectedZone,
  onZone,
  showAvatar = false,
  look,
}) {
  return (
    <div className={"pv-scene" + (interactive ? " pv-scene-editor" : "")}>
      <Art
        name="courtyard"
        size={960}
        alt={c("sceneAlt")}
        c={c}
        eager
        className="pv-scene-background"
      />
      {zones.map((zone) => {
        const item = getItem(scene[zone]);
        return (
          <div key={zone} className={"pv-scene-slot pv-slot-" + zone}>
            {item && (
              <Art
                name={item.image}
                size={256}
                alt={c(item.name)}
                c={c}
                className="pv-placed-item"
              />
            )}
            {interactive && (
              <button
                type="button"
                onClick={() => onZone(zone)}
                className={
                  "pv-zone-marker" +
                  (selectedZone === zone ? " is-selected" : "")
                }
                aria-label={
                  c(zone) + ": " + (item ? c(item.name) : c("emptySpot"))
                }
                aria-pressed={selectedZone === zone}
              >
                {selectedZone === zone ? (
                  <Check size={14} aria-hidden="true" />
                ) : (
                  <span aria-hidden="true">+</span>
                )}
              </button>
            )}
          </div>
        );
      })}
      {showAvatar && (
        <div className="pv-scene-person">
          <Art name="avatar" size={256} alt="" c={c} />
          {look?.hat && (
            <Art
              name="hat"
              size={256}
              alt={c("hat")}
              c={c}
              className="pv-scene-hat"
            />
          )}
        </div>
      )}
    </div>
  );
}

function CharacterStage({ look, c }) {
  return (
    <div
      className={"pv-character-stage pv-mood-" + look.mood}
      aria-label={c("yourLook")}
    >
      <div className="pv-character-orbit" aria-hidden="true" />
      <span className="pv-stage-label">
        <CircleDot size={14} aria-hidden="true" />
        {c("demoCharacter")}
      </span>
      <div className="pv-avatar-layers">
        <Art
          name="avatar"
          size={640}
          alt={c("avatarAlt")}
          c={c}
          eager
          className="pv-avatar-base"
        />
        {look.hat && (
          <Art
            name="hat"
            size={512}
            alt={c("hat")}
            c={c}
            className="pv-avatar-hat"
          />
        )}
      </div>
      {look.bag && (
        <div className="pv-kit-bag">
          <Art name="bag" size={256} alt={c("bag")} c={c} />
          <span>{c("starterKit")}</span>
        </div>
      )}
      <div className="pv-stage-caption">
        <span>{c(look.mood)}</span>
        <span>{c("yourLook")}</span>
      </div>
    </div>
  );
}

function Profile({ c, onItem }) {
  const { look, space } = usePersonalization();
  const [tab, setTab] = useState("about");
  return (
    <>
      <section className="pv-profile-hero">
        <div className="pv-hero-copy">
          <p className="pv-eyebrow">
            <CircleDot size={15} aria-hidden="true" />
            {c("profile")}
          </p>
          <h1>{c("profileTitle")}</h1>
          <p className="pv-intro">{c("profileIntro")}</p>
          <div className="pv-person">
            <span className="pv-portrait">
              <Art name="avatar" size={256} alt="" c={c} />
            </span>
            <div>
              <strong>Maya</strong>
              <p>{c("aboutMaya")}</p>
            </div>
          </div>
          <ActionLink href={paths.character}>{c("editLook")}</ActionLink>
        </div>
        <div className="pv-world-card">
          <div className="pv-world-top">
            <span className="pv-pill">
              <Leaf size={14} aria-hidden="true" />
              {c("space")}
            </span>
            <Link
              href={paths.space}
              className="pv-icon-button"
              aria-label={c("decorate")}
            >
              <Paintbrush size={20} aria-hidden="true" />
            </Link>
          </div>
          <Scene scene={space} c={c} showAvatar look={look} />
          <div className="pv-world-bottom">
            <span>{c("curated")}</span>
            <Link href={paths.space}>
              {c("decorate")}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <div className="pv-profile-lower">
        <section className="pv-profile-story">
          <div className="pv-tabs" role="group" aria-label={c("profile")}>
            {["about", "passport", "collection"].map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={tab === id}
                className={tab === id ? "is-active" : ""}
                onClick={() => setTab(id)}
              >
                {c(id)}
              </button>
            ))}
          </div>
          {tab === "about" ? (
            <div className="pv-story-content">
              <h2>{c("shareTitle")}</h2>
              <p>{c("shareBody")}</p>
              <div className="pv-chips">
                <span>
                  <Compass size={16} aria-hidden="true" />
                  {c("photography")}
                </span>
                <span>
                  <Users size={16} aria-hidden="true" />
                  {c("conversation")}
                </span>
                <span>
                  <Leaf size={16} aria-hidden="true" />
                  {c("learning")}
                </span>
              </div>
            </div>
          ) : tab === "passport" ? (
            <div className="pv-memory-story">
              <Art name="spark" size={256} alt="" c={c} />
              <div>
                <p className="pv-eyebrow">{c("sampleMemory")}</p>
                <h2>{c("memoryTitle")}</h2>
                <p>{c("memoryBody")}</p>
                <button
                  className="pv-text-button"
                  onClick={() => onItem(getItem("spark"))}
                >
                  {c("detail")}
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : (
            <div className="pv-mini-collection">
              {items.map((item) => (
                <button key={item.id} onClick={() => onItem(item)}>
                  <Art name={item.image} size={256} alt="" c={c} />
                  <span>{c(item.name)}</span>
                  {((item.id === "hat" && look.hat) ||
                    (item.id === "bag" && look.bag)) && (
                    <Check size={14} aria-label={c("selected")} />
                  )}
                </button>
              ))}
            </div>
          )}
        </section>
        <Link href={paths.season} className="pv-season-teaser">
          <Art name="season" size={960} alt="" c={c} />
          <div>
            <p className="pv-eyebrow">{c("nextChapter")}</p>
            <h2>{c("seasonTitle")}</h2>
            <span>
              {c("exploreSeason")}
              <ArrowRight size={18} aria-hidden="true" />
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}

function Character({ c, notify }) {
  const { look, setLook } = usePersonalization();
  const params = useSearchParams();
  const [draft, setDraft] = useState(() => ({
    ...look,
    ...(params.get("item") === "hat"
      ? { hat: true }
      : params.get("item") === "bag"
        ? { bag: true }
        : {}),
  }));
  const [category, setCategory] = useState("wardrobe");
  const changed = JSON.stringify(look) !== JSON.stringify(draft);
  return (
    <>
      <PageHeading
        eyebrow={c("character")}
        title={c("studioTitle")}
        intro={c("studioIntro")}
        icon={Shirt}
      />
      <section className="pv-editor-layout">
        <CharacterStage look={draft} c={c} />
        <div className="pv-editor-panel">
          <div className="pv-tabs" role="group" aria-label={c("character")}>
            {["wardrobe", "atmosphere"].map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={category === id}
                onClick={() => setCategory(id)}
                className={category === id ? "is-active" : ""}
              >
                {c(id)}
              </button>
            ))}
          </div>
          <p className="pv-eyebrow pv-panel-eyebrow">{c("starterKit")}</p>
          <h2>{c("choosePieces")}</h2>
          {category === "wardrobe" ? (
            <>
              <div className="pv-wardrobe-grid">
                {items
                  .filter((item) => item.category === "wear")
                  .map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      data-item={item.id}
                      aria-pressed={draft[item.id]}
                      onClick={() =>
                        setDraft({ ...draft, [item.id]: !draft[item.id] })
                      }
                      className={
                        "pv-wardrobe-item pv-tone-" +
                        item.tone +
                        (draft[item.id] ? " is-selected" : "")
                      }
                    >
                      <Art name={item.image} size={256} alt="" c={c} />
                      <strong>{c(item.name)}</strong>
                      <span>
                        {draft[item.id] ? (
                          <>
                            <Check size={15} aria-hidden="true" />
                            {c("selected")}
                          </>
                        ) : (
                          <>
                            {c("tryOn")}
                            <span aria-hidden="true">+</span>
                          </>
                        )}
                      </span>
                    </button>
                  ))}
              </div>
              <p className="pv-small-note">{c("bagNote")}</p>
            </>
          ) : (
            <div className="pv-mood-list">
              {["day", "dusk", "night"].map((mood) => (
                <button
                  type="button"
                  key={mood}
                  className={draft.mood === mood ? "is-selected" : ""}
                  aria-pressed={draft.mood === mood}
                  onClick={() => setDraft({ ...draft, mood })}
                >
                  <span
                    className={"pv-mood-swatch pv-mood-" + mood}
                    aria-hidden="true"
                  >
                    {mood === "night" ? <Moon /> : <Sun />}
                  </span>
                  <strong>{c(mood)}</strong>
                  {draft.mood === mood ? (
                    <Check size={20} aria-hidden="true" />
                  ) : (
                    <span className="pv-radio" />
                  )}
                </button>
              ))}
            </div>
          )}
          <div className="pv-editor-actions">
            <Button
              disabled={!changed}
              onClick={() => {
                setLook({ ...draft });
                notify(c("savedLook"));
              }}
              className="pv-save"
            >
              <Check size={17} aria-hidden="true" />
              {c("saveLook")}
            </Button>
            <button
              type="button"
              className="pv-text-button"
              disabled={!changed}
              onClick={() => {
                setDraft({ ...look });
                notify(c("cancelled"));
              }}
            >
              {c("cancel")}
            </button>
            <p>{c("local")}</p>
          </div>
        </div>
      </section>
    </>
  );
}

function Shop({ c, onItem }) {
  const [category, setCategory] = useState("featured");
  const [query, setQuery] = useState("");
  const filtered = items.filter(
    (item) =>
      (category === "featured" || item.category === category) &&
      c(item.name)
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow={c("shop")}
        title={c("shopTitle")}
        intro={c("shopIntro")}
        icon={ShoppingBag}
      />
      <section className="pv-shop-banner">
        <div>
          <p className="pv-eyebrow">{c("cityExplorer")}</p>
          <h2>{c("collectionNote")}</h2>
          <span>{c("digital")}</span>
        </div>
        <div className="pv-banner-objects" aria-hidden="true">
          <Art name="bag" size={256} c={c} eager />
          <Art name="hat" size={256} c={c} eager />
        </div>
      </section>
      <div className="pv-shop-tools">
        <div className="pv-tabs" role="group" aria-label={c("collection")}>
          {["featured", "wear", "decorate", "memories"].map((id) => (
            <button
              type="button"
              key={id}
              onClick={() => setCategory(id)}
              aria-pressed={id === category}
              className={id === category ? "is-active" : ""}
            >
              {c(id === "decorate" ? "decorateCategory" : id)}
            </button>
          ))}
        </div>
        <label className="pv-search">
          <Search size={18} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={c("search")}
            aria-label={c("search")}
            type="search"
          />
        </label>
      </div>
      <div className="pv-catalog" aria-live="polite">
        {filtered.length ? (
          filtered.map((item) => (
            <article
              className={"pv-item-card pv-tone-" + item.tone}
              key={item.id}
            >
              <button
                className="pv-item-art"
                type="button"
                onClick={() => onItem(item)}
                aria-label={c("preview") + ": " + c(item.name)}
              >
                <Art name={item.image} size={512} alt="" c={c} />
              </button>
              <div className="pv-item-info">
                <span className="pv-item-kind">
                  {c(
                    item.category === "decorate"
                      ? "decorateCategory"
                      : item.category,
                  )}
                </span>
                <h2>{c(item.name)}</h2>
                <button
                  type="button"
                  className="pv-preview-button"
                  onClick={() => onItem(item)}
                >
                  {c("preview")}
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="pv-empty">
            <Search size={32} aria-hidden="true" />
            <h2>{c("noItems")}</h2>
            <button
              className="pv-text-button"
              onClick={() => {
                setQuery("");
                setCategory("featured");
              }}
            >
              {c("clearSearch")}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function Space({ c, notify }) {
  const { space, setSpace } = usePersonalization();
  const params = useSearchParams();
  const incoming = getItem(params.get("item"));
  const [draft, setDraft] = useState(space);
  const [selectedZone, setSelectedZone] = useState(
    incoming?.zones[0] ?? "floorLeft",
  );
  const [history, setHistory] = useState([]);
  const changed = JSON.stringify(draft) !== JSON.stringify(space);
  const selectItem = (itemId) => {
    const next = placeItem(draft, selectedZone, itemId);
    if (next !== draft) {
      setHistory([...history, draft]);
      setDraft(next);
    }
  };
  return (
    <>
      <PageHeading
        eyebrow={c("space")}
        title={c("spaceTitle")}
        intro={c("spaceIntro")}
        icon={House}
      />
      <section className="pv-editor-layout pv-space-layout">
        <div className="pv-space-stage">
          <div className="pv-space-stage-top">
            <span className="pv-pill">
              <Leaf size={14} aria-hidden="true" />
              {c("space")}
            </span>
            <button
              type="button"
              className="pv-icon-button"
              aria-label={c("undo")}
              disabled={!history.length}
              onClick={() => {
                setDraft(history.at(-1));
                setHistory(history.slice(0, -1));
              }}
            >
              <RotateCcw size={18} aria-hidden="true" />
            </button>
          </div>
          <Scene
            scene={draft}
            c={c}
            interactive
            selectedZone={selectedZone}
            onZone={setSelectedZone}
          />
          <p className="pv-space-caption">
            {c("selectedSpot")}: <strong>{c(selectedZone)}</strong>
          </p>
        </div>
        <div className="pv-editor-panel">
          <p className="pv-eyebrow">{c("decorateCategory")}</p>
          <h2>{c("placeTitle")}</h2>
          <p>{c("placeHelp")}</p>
          <label className="pv-zone-select">
            <span>{c("selectedSpot")}</span>
            <select
              value={selectedZone}
              onChange={(event) => setSelectedZone(event.target.value)}
            >
              {zones.map((zone) => (
                <option key={zone} value={zone}>
                  {c(zone)}
                </option>
              ))}
            </select>
          </label>
          <div className="pv-placement-items">
            {items
              .filter((item) => item.zones.includes(selectedZone))
              .map((item) => (
                <button
                  type="button"
                  key={item.id}
                  aria-pressed={draft[selectedZone] === item.id}
                  className={
                    draft[selectedZone] === item.id ? "is-selected" : ""
                  }
                  onClick={() => selectItem(item.id)}
                >
                  <Art name={item.image} size={256} alt="" c={c} />
                  <span>
                    <strong>{c(item.name)}</strong>
                    <small>
                      {draft[selectedZone] === item.id
                        ? c("selected")
                        : c("place")}
                    </small>
                  </span>
                  {draft[selectedZone] === item.id ? (
                    <Check size={18} aria-hidden="true" />
                  ) : (
                    <span aria-hidden="true">+</span>
                  )}
                </button>
              ))}
          </div>
          <button
            type="button"
            className="pv-text-button"
            disabled={!draft[selectedZone]}
            onClick={() => selectItem(null)}
          >
            <X size={16} aria-hidden="true" />
            {c("removeItem")}
          </button>
          <div className="pv-editor-actions">
            <Button
              className="pv-save"
              disabled={!changed}
              onClick={() => {
                setSpace({ ...draft });
                setHistory([]);
                notify(c("savedSpace"));
              }}
            >
              <Check size={17} aria-hidden="true" />
              {c("saveSpace")}
            </Button>
            <button
              type="button"
              className="pv-text-button"
              disabled={!changed}
              onClick={() => {
                setDraft({ ...space });
                setHistory([]);
                notify(c("cancelled"));
              }}
            >
              {c("cancel")}
            </button>
            <p>{c("local")}</p>
          </div>
        </div>
      </section>
    </>
  );
}

function PageHeading({ eyebrow, title, intro, icon: Icon }) {
  return (
    <header className="pv-page-heading">
      <p className="pv-eyebrow">
        <Icon size={15} aria-hidden="true" />
        {eyebrow}
      </p>
      <h1>{title}</h1>
      <p className="pv-intro">{intro}</p>
    </header>
  );
}

export default function PersonalizationPage({ section }) {
  const { language, changeLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const state = usePersonalization();
  const c = getCopy(language);
  const [modal, setModal] = useState(null);
  const [message, setMessage] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const close = () => setModal(null);
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 4500);
    return () => clearTimeout(timer);
  }, [message]);
  const item = modal?.type === "item" ? modal.item : null;
  const chapter = modal?.type === "chapter" ? modal.chapter : null;
  return (
    <div className="pv" lang={language}>
      <div className="pv-topline">
        <Link href="/app/profile">
          <ArrowLeft size={15} aria-hidden="true" />
          {c("homeLink")}
        </Link>
        <div className="pv-utilities">
          <label className="pv-language">
            <span className="sr-only">{c("language")}</span>
            <select
              aria-label={c("language")}
              value={language}
              onChange={(event) => changeLanguage(event.target.value)}
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="es">ES</option>
            </select>
          </label>
          <button
            type="button"
            className="pv-icon-button"
            onClick={toggleTheme}
            aria-label={c("theme")}
          >
            {isDark ? (
              <Sun size={19} aria-hidden="true" />
            ) : (
              <Moon size={19} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            className="pv-icon-button"
            aria-label={c("reset")}
            onClick={() => setModal({ type: "reset" })}
          >
            <RotateCcw size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
      <nav className="pv-nav" aria-label={c("previewNav")}>
        {Object.entries(paths).map(([id, href]) => {
          const Icon = navIcons[id];
          return (
            <Link
              key={id}
              href={href}
              aria-current={id === section ? "page" : undefined}
            >
              <Icon size={17} aria-hidden="true" />
              <span>{c(id)}</span>
            </Link>
          );
        })}
      </nav>
      <p className="pv-preview-note">
        <span aria-hidden="true" />
        {c("sample")}
      </p>
      <div className="pv-content" key={section + resetKey}>
        {section === "profile" && (
          <Profile
            c={c}
            onItem={(value) => setModal({ type: "item", item: value })}
          />
        )}
        {section === "character" && <Character c={c} notify={setMessage} />}
        {section === "shop" && (
          <Shop
            c={c}
            onItem={(value) => setModal({ type: "item", item: value })}
          />
        )}
        {section === "space" && <Space c={c} notify={setMessage} />}
        {section === "season" && (
          <SeasonExplorer
            Art={Art}
            onItem={(value) => setModal({ type: "item", item: value })}
            c={c}
            onChapter={(value) => setModal({ type: "chapter", chapter: value })}
            onPlus={() => setModal({ type: "plus" })}
          />
        )}
      </div>
      <footer className="pv-footer">
        <Flower2 size={18} aria-hidden="true" />
        <span>{c("local")}</span>
      </footer>
      <div
        role="status"
        aria-live="polite"
        className={"pv-toast" + (message ? " is-visible" : "")}
      >
        {message && (
          <>
            <Check size={18} aria-hidden="true" />
            {message}
          </>
        )}
      </div>
      {modal && (
        <Dialog
          title={
            item
              ? c(item.name)
              : chapter
                ? c(chapter.title)
                : modal.type === "plus"
                  ? c("seasonPlus")
                  : c("resetTitle")
          }
          onClose={close}
          c={c}
        >
          {item && (
            <>
              <div className={"pv-detail-art pv-tone-" + item.tone}>
                <Art
                  name={item.image}
                  size={512}
                  alt={c(item.name)}
                  c={c}
                  eager
                />
              </div>
              <p className="pv-eyebrow">
                {c(item.category === "memories" ? "sampleMemory" : "digital")}
              </p>
              <p className="pv-detail-copy">{c(item.description)}</p>
              <ActionLink
                href={
                  (item.category === "wear" ? paths.character : paths.space) +
                  "?item=" +
                  item.id
                }
                onClick={close}
              >
                {c(item.category === "wear" ? "tryOn" : "trySpace")}
              </ActionLink>
            </>
          )}
          {chapter && (
            <>
              <p className="pv-detail-copy">{c(chapter.detail)}</p>
              <h3>{c("chapterInvitation")}</h3>
              <p>{c(chapter.invitation)}</p>
              <div className="pv-chapter-reward">
                <Art name="spark" size={256} alt="" c={c} />
                <div>
                  <p className="pv-eyebrow">{c("chapterMemory")}</p>
                  <strong>{c(chapter.reward)}</strong>
                </div>
              </div>
              <p className="pv-disclosure">{c("chapterNotice")}</p>
              <Button className="pv-save" onClick={close}>
                {c("close")}
              </Button>
            </>
          )}
          {modal.type === "plus" && (
            <>
              <h3 className="pv-plus-title">{c("plusTitle")}</h3>
              <p>{c("plusBody")}</p>
              <div className="pv-compare-row">
                <Check size={20} aria-hidden="true" />
                <div>
                  <strong>{c("free")}</strong>
                  <p>{c("freeBenefit")}</p>
                </div>
              </div>
              <div className="pv-compare-row">
                <Sparkles size={20} aria-hidden="true" />
                <div>
                  <strong>{c("seasonPlus")}</strong>
                  <p>{c("plusBenefit")}</p>
                </div>
              </div>
              <p className="pv-disclosure">{c("plusNotice")}</p>
              <Button className="pv-save" onClick={close}>
                {c("backJourney")}
              </Button>
            </>
          )}
          {modal.type === "reset" && (
            <>
              <p className="pv-detail-copy">{c("resetBody")}</p>
              <Button
                className="pv-save"
                onClick={() => {
                  state.reset();
                  setResetKey(resetKey + 1);
                  close();
                  setMessage(c("resetDone"));
                }}
              >
                {c("reset")}
              </Button>
              <button
                type="button"
                className="pv-text-button pv-dialog-secondary"
                onClick={close}
              >
                {c("keep")}
              </button>
            </>
          )}
        </Dialog>
      )}
    </div>
  );
}
