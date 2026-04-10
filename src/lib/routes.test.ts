import { buildArticlePath, resolveStationSlug, slugifySegment } from "./routes";

describe("routes helpers", () => {
  it("slugifies editorial and article segments safely", () => {
    expect(slugifySegment("Fato Popular 88 FM!")).toBe("fato-popular-88-fm");
    expect(slugifySegment(" Notícias & Serviços ")).toBe("noticias-servicos");
  });

  it("normalizes known station aliases", () => {
    expect(resolveStationSlug(undefined, "radio-88-fm")).toBe("radio88fm");
    expect(resolveStationSlug(undefined, "fato-popular-88-fm")).toBe("fatopopular");
    expect(resolveStationSlug("GTF News", undefined)).toBe("gtfnews");
  });

  it("falls back to the legacy route when the post has no slug", () => {
    expect(
      buildArticlePath({
        id: 31,
        slug: "",
        editorial: "Receitas",
        emissora: "Rádio 88 FM",
        emissoraSlug: "radio-88-fm",
      })
    ).toBe("/noticia/31");
  });

  it("builds a canonical article path with station and editorial", () => {
    expect(
      buildArticlePath({
        id: 88,
        slug: "Trump sobre Irã: Uma civilização inteira morrerá esta noite",
        editorial: "Notícias",
        emissora: "Fato Popular 88 FM",
        emissoraSlug: "fato-popular-88-fm",
      })
    ).toBe("/fatopopular/noticias/trump-sobre-ira-uma-civilizacao-inteira-morrera-esta-noite");
  });
});
