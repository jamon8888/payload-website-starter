import * as migration_20260918_151143_initial from './20260918_151143_initial';
import * as migration_20261006_162727_multilingual_aeo_accessibility from './20261006_162727_multilingual_aeo_accessibility';
import * as migration_20261006_163512_localize_link_labels from './20261006_163512_localize_link_labels';

export const migrations = [
  {
    up: migration_20260918_151143_initial.up,
    down: migration_20260918_151143_initial.down,
    name: '20260918_151143_initial',
  },
  {
    up: migration_20261006_162727_multilingual_aeo_accessibility.up,
    down: migration_20261006_162727_multilingual_aeo_accessibility.down,
    name: '20261006_162727_multilingual_aeo_accessibility',
  },
  {
    up: migration_20261006_163512_localize_link_labels.up,
    down: migration_20261006_163512_localize_link_labels.down,
    name: '20261006_163512_localize_link_labels'
  },
];
