import {useNonce} from '@shopify/hydrogen';

const STUB =
  'window.bhaktihub=window.bhaktihub||{_q:[],identify:function(e){this._q.push(e)}};';

export function BhaktiHubPixel() {
  const nonce = useNonce();

  return (
    <>
      <script nonce={nonce} dangerouslySetInnerHTML={{__html: STUB}} />
      <script
        nonce={nonce}
        async
        src="https://bhaktihub.io/px.js?k=cdd9568ec981ec0fa9bc1ab2"
      />
    </>
  );
}
