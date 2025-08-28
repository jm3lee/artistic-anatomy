{% from "templates/bony_landmarks.jinja" import bony_landmarks %}
{% from "templates/figure.jinja" import figure %}

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Gray203.png/512px-Gray203.png?20070123172303" %}
{% set alt = "Gray203" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Gray203.png'>Henry Vandyke Carter</a>, Public domain, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Gray203.png" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=512
) }}

## Movements {{'{#movements}'}}

The scapula moves freely across the rib cage, allowing the arm to position
itself in space. Its primary motions are summarized below.

<dl>
  <dt id="scapular-depression">Depression</dt>
  <dd>Lowering the shoulder blade away from the ears.</dd>
  <dd>Ring or bar dip: driving your shoulders downward as you lower your body.</dd>
  <dd>Lower {{ linktitle('trz') }}, {{ linktitle('pecmin') }}, {{ linktitle('ld') }}</dd>

  <dt id="scapular_elevation">Elevation</dt>
  <dd>Raising the shoulder blade toward the ears.</dd>
  <dd>Dumbbell shrug: lifting your shoulders straight up toward your ears.</dd>
  <dd>Upper {{ linktitle('trz') }}, Levator Scapulae</dd>

  <dt id="scapular-protraction">Protraction</dt>
  <dd>Sliding the shoulder blade forward around the rib cage.</dd>
  <dd>Push‑up plus: at the top of a push‑up, actively thrusting your chest away from the floor to spread the shoulder blades.</dd>
  <dd>{{ linktitle('sa') }}, {{ linktitle('pecmin') }}</dd>

  <dt id="scapular_retraction">Retraction</dt>
  <dd>Drawing the shoulder blade back toward the spine.</dd>
  <dd>Performing a seated row: pulling the handles toward your torso, squeezing shoulder blades together.</dd>
  <dd>{{ linktitle('rhmaj') }}, {{ linktitle('rhmin') }}, Middle {{ linktitle('trz') }}</dd>

  <dt id="scapular_downward_rotation">Rotation (Downward)</dt>
  <dd>Returning the scapula from an upwardly rotated position.</dd>
  <dd>Lowering a heavy overhead load: bringing your arms from overhead back to your sides, guiding the shoulder blades back down.</dd>
  <dd>{{ linktitle('rhmaj') }}, {{ linktitle('rhmin') }}, Levator Scapulae, {{ linktitle('pecmin') }}</dd>

  <dt id="scapular_upward_rotation">Rotation (Upward)</dt>
  <dd>Rotating the scapula so the glenoid cavity faces upward.</dd>
  <dd>Overhead press or high‑five: raising your arms overhead while the shoulder blade’s lower angle pivots upward.</dd>
  <dd>Upper {{ linktitle('trz') }}, Lower {{ linktitle('trz') }}, {{ linktitle('sa') }}</dd>
</dl>

### References

- {{ linktitle('bk-3d') }} 17, 27

## Bony Landmarks

{{ bony_landmarks('scapula') }}

## 🖼️ Examples

<img
src="https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/bones/scapula-0000.jpg"
alt="Woman Combing Her Hair, Edgar Degas, ca. 1888-90"
loading="lazy"/> 

## References

* [Scapula (Wikipedia)](https://en.wikipedia.org/wiki/Scapula)
* {{ linktitle('gf') }}
  * **152** Scapula peeks out from the back.
