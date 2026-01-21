'use client';

import { useState, useRef } from 'react';
import { useStrategyStore } from '@/store/useStrategyStore';
import { StratButton } from '@/components/StratButton';
import { StrategyCard } from '@/components/StrategyCard';
import { StrategyList } from '@/components/StrategyList';
import { AddStrategyModal } from '@/components/AddStrategyModal';
import { FilterPanel } from '@/components/FilterPanel';
import { Header } from '@/components/Header';
import type { Team, Difficulty } from '@/types';
import styles from './page.module.css';

export default function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStrategies, setShowStrategies] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [generateCount, setGenerateCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { currentStrategy, selectStrat, clearCurrentStrategy, strategies, addStrategies } = useStrategyStore();

  const handleSpin = () => {
    setGenerateCount((c) => c + 1);
    selectStrat();
  };

  const handleImportClick = () => {
    setImportError(null);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter((line) => line.trim());
      
      // Skip header if present
      const startIndex = lines[0]?.toLowerCase().includes('title') ? 1 : 0;
      
      const validTeams = ['T', 'CT'];
      const validDifficulties = ['Easy', 'Medium', 'Hard'];
      
      const validStrategies: { name: string; description: string; team: Team; difficulty: Difficulty }[] = [];
      let hasInvalidRows = false;
      
      lines.slice(startIndex).forEach((line) => {
        const [name, description, teamRaw, difficultyRaw] = line.split(',').map((s) => s.trim());
        
        // Validate team and difficulty
        const isValidTeam = validTeams.includes(teamRaw);
        const isValidDifficulty = validDifficulties.includes(difficultyRaw);
        
        if (!name || !isValidTeam || !isValidDifficulty) {
          hasInvalidRows = true;
          return;
        }
        
        validStrategies.push({
          name,
          description: description || '',
          team: teamRaw as Team,
          difficulty: difficultyRaw as Difficulty,
        });
      });

      if (validStrategies.length > 0) {
        addStrategies(validStrategies);
      }
      
      if (hasInvalidRows) {
        setImportError('Some strategies were not imported due to invalid team or difficulty values. Team must be "T" or "CT", difficulty must be "Easy", "Medium", or "Hard".');
      }
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.container}>
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
            onClick={handleImportClick}
          >
            Import CSV
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {importError && (
          <div className={styles.errorMessage}>
            {importError}
            <button className={styles.errorClose} onClick={() => setImportError(null)}>×</button>
          </div>
        )}

        <div className={styles.viewAllRow}>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowStrategies(!showStrategies)}
          >
            {showStrategies ? 'Hide List' : 'View All'} ({strategies.length})
          </button>
        </div>

        {showStrategies && <StrategyList />}

        <div className={styles.stratButtonWrapper}>
          <StratButton onSpin={handleSpin} />
        </div>
        
        {currentStrategy && (
          <div key={`${currentStrategy.id}-${generateCount}`} className={styles.resultContainer}>
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

      {showAddModal && (
        <AddStrategyModal onClose={() => setShowAddModal(false)} />
      )}
    </main>
  );
}
