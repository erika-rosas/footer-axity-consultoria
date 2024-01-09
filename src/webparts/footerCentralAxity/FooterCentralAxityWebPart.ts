import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import styles from "./FooterCentralAxityWebPart.module.scss";
import * as strings from "FooterCentralAxityWebPartStrings";
import { ROUTER_STRING } from "./constants/const";

export interface IFooterCentralAxityWebPartProps {
  description: string;
}
// private _environmentMessage: string = "";
export default class FooterCentralAxityWebPart extends BaseClientSideWebPart<IFooterCentralAxityWebPartProps> {
  private routerString = ROUTER_STRING;
  public render(): void {
    this.domElement.innerHTML = `
    <section class="${styles.footerCentralAxity} ${
      !!this.context.sdks.microsoftTeams ? styles.teams : ""
    }">
      <div class="${styles.contentFooter}">
       <a href="${this.routerString.facebook}" target="_blank"><span class="${
      styles.redirectFacebook
    }"></span></a>
      <a href="${this.routerString.instagram}" target="_blank"><span class="${
      styles.redirectInstagram
    }"></span></a>
    <a href="${this.routerString.twitter}" target="_blank"><span class="${
      styles.redirectTwitter
    }"></span></a>
    <a href="${this.routerString.linkedin}" target="_blank"><span class="${
      styles.redirectLinkedin
    }"></span></a>
      </div>
    </section>`;
  }

  protected onInit(): Promise<void> {
    return Promise.resolve();
  }
  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty(
        "--bodyText",
        semanticColors.bodyText || null
      );
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty(
        "--linkHovered",
        semanticColors.linkHovered || null
      );
    }
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
