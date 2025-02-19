import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Secure by Default',
    Svg: require('@site/static/img/undraw_safe_0mei.svg').default,
    description: (
      <>
        Built with Zero Trust Architecture at its core. Your credentials are
        protected with industry-leading security practices and standards
        compliance.
      </>
    ),
  },
  {
    title: 'Universal Compatibility',
    Svg: require('@site/static/img/undraw_connected-world_anke.svg').default,
    description: (
      <>
        Support for all major standards including <code>SD-JWT</code>,{' '}
        <code>mDL</code>, and <code>W3C VCDM</code>. Works everywhere you need
        it.
      </>
    ),
  },
  {
    title: 'Developer First',
    Svg: require('@site/static/img/undraw_developer-activity_dn7p.svg').default,
    description: (
      <>
        Type-safe APIs, comprehensive documentation, and intuitive interfaces
        make implementing digital credentials a breeze.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
