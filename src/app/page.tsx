'use client';

import { useState } from 'react';
import { useStrategyStore } from '@/store/useStrategyStore';
import { RouletteWheel } from '@/components/RouletteWheel';
import { StrategyCard } from '@/components/StrategyCard';
import { StrategyList } from '@/components/StrategyList';
import { AddStrategyModal } from '@/components/AddStrategyModal';
import { FilterPanel } from '@/components/FilterPanel';
import { Header } from '@/components/Header';
import styles from './page.module.css';

export default function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStrategies, setShowStrategies] = useState(false);
  const { currentStrategy, isSpinning, spinRoulette, clearCurrentStrategy, strategies } = useStrategyStore();

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <FilterPanel />
          
          <div className={styles.actions}>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowAddModal(true)}
            >
              + Add Strategy
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowStrategies(!showStrategies)}
            >
              {showStrategies ? 'Hide List' : 'View All'} ({strategies.length})
            </button>
          </div>

          {showStrategies && <StrategyList />}
        </div>

        <div className={styles.centerPanel}>
          <RouletteWheel 
            isSpinning={isSpinning} 
            onSpin={spinRoulette}
          />
          
          {currentStrategy && !isSpinning && (
            <div className={styles.resultContainer}>
              <StrategyCard strategy={currentStrategy} isResult />
              <button 
                className={`btn btn-secondary ${styles.clearBtn}`}
                onClick={clearCurrentStrategy}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <AddStrategyModal onClose={() => setShowAddModal(false)} />
      )}
    </main>
  );
}

