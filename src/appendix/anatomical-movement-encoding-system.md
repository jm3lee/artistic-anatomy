---
title: Anatomical Movement Encoding System
author: Brian Lee
---

**Anatomical Movement Encoding System**

This system provides a concise, unambiguous shorthand for labeling anatomical movements. It consists of three parts separated by hyphens:

```
JointCode–ActionCode–SideCode
```

No spaces, all uppercase. Example: `GH–FLE–L` (left shoulder flexion).

## Joint Codes (JointCode)
A comprehensive list covering major articulations:

| Code  | Joint / Region                                                      |
|:-----:|:---------------------------------------------------------------------|
| AC    | Acromioclavicular                                                   |
| ANK   | Talocrural (ankle)                                                  |
| CMC   | Carpometacarpal (thumb base)                                        |
| CN    | Cervical spine (neck)                                               |
| DIP   | Distal interphalangeal (finger joints)                              |
| DIPT  | Distal interphalangeal (toe joints)                                 |
| EL    | Elbow (humeroulnar + humeroradial)                                  |
| GH    | Glenohumeral (shoulder)                                             |
| HIP   | Acetabulofemoral (hip)                                              |
| IPF   | Interphalangeal (finger or toe)                                     |
| KN    | Tibiofemoral (knee)                                                 |
| LN    | Lumbar spine                                                        |
| LS    | Lumbosacral junction                                                 |
| MCP   | Metacarpophalangeal (knuckles)                                      |
| MTP   | Metatarsophalangeal (toe knuckles)                                  |
| PIP   | Proximal interphalangeal (finger joints)                            |
| RU    | Radioulnar (proximal & distal forearm pivots)                        |
| SC    | Sternoclavicular                                                    |
| SCoc  | Sacrococcygeal joint                                                |
| SI    | Sacroiliac joint                                                    |
| ST    | Scapulothoracic (scapular gliding)                                  |
| SubT  | Subtalar (below ankle)                                              |
| TMJ   | Temporomandibular (jaw)                                             |
| TMT   | Tarsometatarsal (midfoot)                                           |
| TN    | Thoracic spine                                                      |
| WR    | Wrist (radiocarpal)                                                 |
| …     | _Extendable: e.g., SIJ, T4–T5, L5–S1, CL (clavicle), RIB_            |

## Action Codes (ActionCode)
Movements and positions with standardized abbreviations:

| Code  | Movement / Position                                  |
|:-----:|:------------------------------------------------------|
| ABD   | Abduction (away from midline)                         |
| ADD   | Adduction (toward midline)                            |
| CIR   | Circumduction (circular motion)                       |
| DEP   | Depression (scapula down)                             |
| DFL   | Dorsiflexion (ankle, foot up)                         |
| ELE   | Elevation (scapula up)                                |
| EVE   | Eversion (sole away from midline)                     |
| EXT   | Extension (increasing angle)                          |
| FLE   | Flexion (decreasing angle)                            |
| INV   | Inversion (sole toward midline)                       |
| LTR   | Lateral / external rotation                           |
| MTR   | Medial / internal rotation                            |
| PFL   | Plantarflexion (ankle, foot down)                     |
| PRO   | Pronation (forearm, palm down)                        |
| PROT  | Protraction (scapula forward)                         |
| RAD   | Radial deviation (wrist toward thumb)                 |
| RET   | Retraction (scapula backward)                         |
| SUP   | Supination (forearm, palm up)                         |
| ULN   | Ulnar deviation (wrist toward little finger)          |
| …     | _Additional as needed (e.g., OPP = Opposition)_       |

## Side Codes (SideCode)
Indicates which side(s) of the body:

| Code | Meaning           |
|:----:|:------------------|
| L    | Left              |
| R    | Right             |
| B    | Bilateral / Both  |

Use **B** for truly simultaneous bilateral actions (e.g., `ST–ELE–B`). Otherwise choose **L** or **R**.

## Building a Code
1. **Select JointCode** from the joint list.
2. **Select ActionCode** from the action list.
3. **Select SideCode** (L, R, or B).
4. **Combine** with hyphens: `Joint–Action–Side`.

**Examples:**

- `GH–FLE–L`: Left shoulder flexion
- `EL–EXT–R`: Right elbow extension
- `WR–RAD–L`: Left wrist radial deviation
- `ANK–DFL–R`: Right ankle dorsiflexion
- `ST–RET–B`: Bilateral scapular retraction

## Tips for Use
- Keep this reference table accessible until familiar.
- When adding new codes, follow existing abbreviation patterns.
- Use in filenames, annotations, databases, or software tags.
- Ensure consistency—avoid ad hoc abbreviations.

With these comprehensive lists, you cover all common anatomical movements and joints for artists, clinicians, and developers alike.

## References

- {{ linktitle('anaplanes') }}
