import type { AssetId } from "meta/platform_api@internal/index";
import type { TextureAsset } from "meta/worlds";

/** Returns an asset ID from the given asset dependency formatted for an image file. */
export function getTextureAssetId(asset: TextureAsset): string {
	const assetId: AssetId = asset.getId();
	return `${assetId.packageOrRemoteId}.${assetId.ingestionId}.${assetId.targetId}.${assetId.contextId}.tex.png`;
}
