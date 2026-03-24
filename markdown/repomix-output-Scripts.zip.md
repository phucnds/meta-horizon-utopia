This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: **/*.cs
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
Drops/
  Candy.cs/
    Candy.cs
  Cash.cs/
    Cash.cs
  Chest.cs/
    Chest.cs
  DroppableCurrency.cs/
    DroppableCurrency.cs
Effects/
  BumpyButton.cs/
    BumpyButton.cs
  CameraShake.cs/
    CameraShake.cs
  DamageText.cs/
    DamageText.cs
  HopOnTap.cs/
    HopOnTap.cs
  ScalenRotate.cs/
    ScalenRotate.cs
  SpriteSorter.cs/
    SpriteSorter.cs
Enemy/
  Enemy.cs/
    Enemy.cs
  EnemyBullet.cs/
    EnemyBullet.cs
  EnemyMovement.cs/
    EnemyMovement.cs
  MeleeEnemy.cs/
    MeleeEnemy.cs
  RangeEnemy.cs/
    RangeEnemy.cs
  RangeEnemyAttack.cs/
    RangeEnemyAttack.cs
GUI/
  CharacterButton.cs/
    CharacterButton.cs
  CharacterInfoPanel.cs/
    CharacterInfoPanel.cs
  ChestObjecContainer.cs/
    ChestObjecContainer.cs
  CreditsScroller.cs/
    CreditsScroller.cs
  CurrencyText.cs/
    CurrencyText.cs
  InventoryItem.cs/
    InventoryItem.cs
  InventoryItemInfo.cs/
    InventoryItemInfo.cs
  PlayerStatsDisplay.cs/
    PlayerStatsDisplay.cs
  PremiumCurrencyText.cs/
    PremiumCurrencyText.cs
  ShopItemContainer.cs/
    ShopItemContainer.cs
  ShopManagerUI.cs/
    ShopManagerUI.cs
  StatContainer.cs/
    StatContainer.cs
  UpgradeContainer.cs/
    UpgradeContainer.cs
  WaveManagerUI.cs/
    WaveManagerUI.cs
  WeaponSelectionContainer.cs/
    WeaponSelectionContainer.cs
InfiniteMap/
  InfiniteChildMover.cs/
    InfiniteChildMover.cs
  InfiniteMap.cs/
    InfiniteMap.cs
Interfaces/
  ICollectable.cs/
    ICollectable.cs
  IPlayerStatsDepnedency.cs/
    IPlayerStatsDepnedency.cs
Managers/
  AudioManager.cs/
    AudioManager.cs
  CameraController.cs/
    CameraController.cs
  CharacterSelectionManager.cs/
    CharacterSelectionManager.cs
  ColorHolder.cs/
    ColorHolder.cs
  CurrencyManager.cs/
    CurrencyManager.cs
  DamageTextManager.cs/
    DamageTextManager.cs
  DropManager.cs/
    DropManager.cs
  Enums.cs/
    Enums.cs
  GameHandler.cs/
    GameHandler.cs
  InventoryManager.cs/
    InventoryManager.cs
  PlayerStatsManager.cs/
    PlayerStatsManager.cs
  ResourcesManager.cs/
    ResourcesManager.cs
  SettingsManager.cs/
    SettingsManager.cs
  ShopManager.cs/
    ShopManager.cs
  StatContainerManager.cs/
    StatContainerManager.cs
  UIManager.cs/
    UIManager.cs
  WaveManager.cs/
    WaveManager.cs
  WaveTransitionManager.cs/
    WaveTransitionManager.cs
  WeaponMerger.cs/
    WeaponMerger.cs
  WeaponSelectionManager.cs/
    WeaponSelectionManager.cs
Player/
  Player.cs/
    Player.cs
  PlayerAnimator.cs/
    PlayerAnimator.cs
  PlayerController.cs/
    PlayerController.cs
  PlayerDetection.cs/
    PlayerDetection.cs
  PlayerHealth.cs/
    PlayerHealth.cs
  PlayerLevel.cs/
    PlayerLevel.cs
  PlayerObjects.cs/
    PlayerObjects.cs
  PlayerWeapons.cs/
    PlayerWeapons.cs
ScriptableObjects/
  CharacterDataSO.cs/
    CharacterDataSO.cs
  ObjectDataSO.cs/
    ObjectDataSO.cs
  PaletteSO.cs/
    PaletteSO.cs
  StatIconDataSO.cs/
    StatIconDataSO.cs
  WeaponDataSO.cs/
    WeaponDataSO.cs
Weapons/
  Bullet.cs/
    Bullet.cs
  MeleeWeapon.cs/
    MeleeWeapon.cs
  RangeWeapon.cs/
    RangeWeapon.cs
  Weapon.cs/
    Weapon.cs
  WeaponPosition.cs/
    WeaponPosition.cs
  WeaponStatsCalculator.cs/
    WeaponStatsCalculator.cs
```

# Files

## File: Drops/Candy.cs/Candy.cs
```csharp
using System;
using UnityEngine;

public class Candy : DroppableCurrency
{
    public static Action<Candy> onCollected;

    protected override void Collected()
    {
        onCollected?.Invoke(this);
    }
}
```

## File: Drops/Cash.cs/Cash.cs
```csharp
using System;
using UnityEngine;

public class Cash : DroppableCurrency
{
    public static Action<Cash> onCollected;

    protected override void Collected()
    {
        onCollected?.Invoke(this);
    }
}
```

## File: Drops/Chest.cs/Chest.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Chest : DroppableCurrency
{
    public static Action<Chest> onCollected;

    protected override void Collected()
    {
        onCollected?.Invoke(this);
    }
}
```

## File: Drops/DroppableCurrency.cs/DroppableCurrency.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public abstract class DroppableCurrency : MonoBehaviour, ICollectable
{
    private bool collected;

    private void OnEnable()
    {
        collected = false;
    }

    public void Collect(Player player)
    {
        if (collected) return;

        collected = true;

        StartCoroutine(MoveTowardsPlayer(player));
    }

    private IEnumerator MoveTowardsPlayer(Player player)
    {
        float timer = 0;
        Vector2 initialPos = transform.position;

        while (timer < 1)
        {
            transform.position = Vector2.Lerp(initialPos, player.GetCenter(), timer);
            timer += Time.deltaTime;
            yield return null;
        }

        Collected();
    }

    protected abstract void Collected();

}
```

## File: Effects/BumpyButton.cs/BumpyButton.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class BumpyButton : MonoBehaviour, IPointerDownHandler, IPointerUpHandler, IPointerExitHandler
{

    private Button button;

    private void Awake()
    {
        button = GetComponent<Button>();
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        if (!button.interactable) return;

        LeanTween.cancel(gameObject);
        LeanTween.scale(gameObject, new Vector2(1.1f, .9f), .6f).setEase(LeanTweenType.easeInElastic).setIgnoreTimeScale(true);
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        if (!button.interactable) return;
        LeanTween.cancel(gameObject);
        LeanTween.scale(gameObject, Vector2.one, .6f).setEase(LeanTweenType.easeOutElastic).setIgnoreTimeScale(true);
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        if (!button.interactable) return;
        LeanTween.cancel(gameObject);
        LeanTween.scale(gameObject, Vector2.one, .6f).setEase(LeanTweenType.easeOutElastic).setIgnoreTimeScale(true);
    }
}
```

## File: Effects/CameraShake.cs/CameraShake.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraShake : MonoBehaviour
{
    [SerializeField] private float shakeMagnitude;
    [SerializeField] private float shakeDuration;

    private void Awake()
    {
        RangeWeapon.onBulletShoot += Shake;
    }

    private void OnDestroy()
    {
        RangeWeapon.onBulletShoot -= Shake;
    }


    [NaughtyAttributes.Button]
    private void Shake()
    {
        Vector2 direction = Random.onUnitSphere.With(z: 0).normalized;
        transform.localPosition = Vector3.zero;

        LeanTween.cancel(gameObject);
        LeanTween.moveLocal(gameObject, direction * shakeMagnitude, shakeDuration).setEase(LeanTweenType.easeShake);
    }
}
```

## File: Effects/DamageText.cs/DamageText.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class DamageText : MonoBehaviour
{
    [SerializeField] private TextMeshPro txtDamage;
    [SerializeField] private Animator anim;

    [NaughtyAttributes.Button]
    public void PlayAnim(string damage, bool isCriticalHit)
    {
        anim.Play("TextFading");
        txtDamage.text = damage;
        txtDamage.color = isCriticalHit ? Color.red : Color.white;
    }
}
```

## File: Effects/HopOnTap.cs/HopOnTap.cs
```csharp
using UnityEngine;
using UnityEngine.EventSystems;

public class HopOnTap : MonoBehaviour, IPointerDownHandler
{
    private RectTransform rt;
    private Vector2 initialPosition;

    private void Awake()
    {
        rt = GetComponent<RectTransform>();
        initialPosition = rt.anchoredPosition;
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        float targetY = initialPosition.y + Screen.height / 50;

        LeanTween.cancel(gameObject);
        LeanTween.moveY(rt, targetY, .6f).setEase(LeanTweenType.punch).setIgnoreTimeScale(true);
    }
}
```

## File: Effects/ScalenRotate.cs/ScalenRotate.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class ScalenRotate : MonoBehaviour, IPointerDownHandler
{
    private RectTransform rt;

    private void Awake()
    {
        rt = GetComponent<RectTransform>();
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        LeanTween.cancel(gameObject);
        rt.localScale = Vector2.one;
        LeanTween.scale(rt, Vector2.one * 1.1f, 1).setEase(LeanTweenType.punch).setIgnoreTimeScale(true);

        // rt.rotation = Quaternion.identity;
        // int sign = (int)Mathf.Sign(Random.Range(1f, 1f));
        // LeanTween.rotateAround(rt, Vector3.forward, 15 * sign, 1).setEase(LeanTweenType.punch).setIgnoreTimeScale(true);
    }
}
```

## File: Effects/SpriteSorter.cs/SpriteSorter.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpriteSorter : MonoBehaviour
{
    private SpriteRenderer spriteRenderer;

    private void Awake()
    {
        spriteRenderer = GetComponent<SpriteRenderer>();
    }
}
```

## File: Enemy/Enemy.cs/Enemy.cs
```csharp
using System;
using UnityEngine;

public abstract class Enemy : MonoBehaviour
{
    [SerializeField] protected ParticleSystem passAwayParticles;
    [SerializeField] protected SpriteRenderer sprEnemy;
    [SerializeField] protected SpriteRenderer sprSpawnIndicator;
    [SerializeField] protected float playerDetectionRadius = .5f;

    [SerializeField] protected int maxHealth;

    public static Action<int, Vector2, bool> onDamageTaken;
    public static Action<Vector2> onPassedAway;

    protected int health;

    protected EnemyMovement movement;
    protected Player player;
    protected Collider2D col2d;
    protected bool hasSpawned = false;

    protected virtual void Awake()
    {
        movement = GetComponent<EnemyMovement>();
        col2d = GetComponent<Collider2D>();
    }

    protected virtual void Start()
    {
        health = maxHealth;
        player = FindFirstObjectByType<Player>();

        if (player == null)
        {
            Debug.LogWarning("No player found, Auto-destroying...");
            Destroy(gameObject);
        }
        StarSpawnSequence();
    }

    public virtual void TakeDamage(int damage, bool isCriticalHit)
    {
        health -= damage;
        health = Mathf.Clamp(health, 0, maxHealth);

        onDamageTaken?.Invoke(damage, transform.position, isCriticalHit);

        if (health <= 0)
        {
            PassAway();
        }
    }

    public void PassAway()
    {
        onPassedAway?.Invoke(transform.position);
        passAwayParticles.transform.SetParent(null);
        passAwayParticles.Play();
        Destroy(gameObject);
    }

    private void StarSpawnSequence()
    {
        SetRenderersVisibility(false);
        Vector3 targetScale = sprSpawnIndicator.transform.localScale * 1.2f;
        LeanTween.scale(sprSpawnIndicator.gameObject, targetScale, .3f).setLoopPingPong(4).setOnComplete(SpawnSequenceCompleted);
    }

    private void SetRenderersVisibility(bool visibility)
    {
        col2d.enabled = visibility;
        sprEnemy.enabled = visibility;
        sprSpawnIndicator.enabled = !visibility;
    }

    private void SpawnSequenceCompleted()
    {
        SetRenderersVisibility(true);
        hasSpawned = true;
        movement.StorePlayer(player);
    }

    protected virtual void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.blue;
        Gizmos.DrawWireSphere(transform.position, playerDetectionRadius);
    }
}
```

## File: Enemy/EnemyBullet.cs/EnemyBullet.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class EnemyBullet : MonoBehaviour
{
    [SerializeField] private float moveSpeed = 5f;
    private RangeEnemyAttack rangeEnemyAttack;

    private int damage;
    private Rigidbody2D rb;
    private Collider2D col2D;

    private void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
        col2D = GetComponent<Collider2D>();
    }

    public void ShootBullet(int damage, Vector2 dir)
    {
        Invoke(nameof(Release), 5);
        this.damage = damage;
        transform.right = dir;
        rb.linearVelocity += dir * moveSpeed;
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.TryGetComponent<Player>(out Player player))
        {
            CancelInvoke();
            player.TakeDamage(1);
            col2D.enabled = false;
            Release();
        }
    }

    public void Configure(RangeEnemyAttack rangeEnemyAttack)
    {
        this.rangeEnemyAttack = rangeEnemyAttack;
    }

    public void Reload()
    {
        rb.linearVelocity = Vector2.zero;
        col2D.enabled = true;
    }

    private void Release()
    {
        if (!gameObject.activeSelf) return;
        rangeEnemyAttack.ReleaseBullet(this);
    }
}
```

## File: Enemy/EnemyMovement.cs/EnemyMovement.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyMovement : MonoBehaviour
{
    [SerializeField] private float moveSpeed = 1f;

    private Player player;

    private void Update()
    {
         if (player == null) return;
        // FollowPlayer();

        transform.localScale = player.transform.position.x > transform.position.x ? Vector3.one : Vector3.one.With(x: -1);
    }

    public void StorePlayer(Player _player)
    {
        this.player = _player;
    }

    public void FollowPlayer()
    {
        Vector2 dir = (player.transform.position - transform.position).normalized;
        Vector2 targetPos = (Vector2)transform.position + dir * moveSpeed * Time.deltaTime;
        transform.position = targetPos;
    }


}
```

## File: Enemy/MeleeEnemy.cs/MeleeEnemy.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class MeleeEnemy : Enemy
{
    [SerializeField] private float attackFrequency;
    [SerializeField] protected int damage = 1;

    private float attackDelay;
    private float attackTimer;

    override protected void Start()
    {
        base.Start();
        attackDelay = 1f / attackFrequency;
    }

    private void Update()
    {
        if (!hasSpawned) return;
        if (attackTimer >= attackDelay)
        {
            TryAttack();
        }
        else
        {
            Wait();
        }

        movement.FollowPlayer();
    }

    private void Wait()
    {
        attackTimer += Time.deltaTime;
    }

    private void Attack()
    {
        attackTimer = 0;
        player.TakeDamage(damage);
    }

    private void TryAttack()
    {
        float distanceToPlayer = Vector2.Distance(transform.position, player.transform.position);
        if (distanceToPlayer < playerDetectionRadius)
        {
            Attack();
        }
    }
}
```

## File: Enemy/RangeEnemy.cs/RangeEnemy.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RangeEnemy : Enemy
{

    private RangeEnemyAttack attack;

    override protected void Awake()
    {
        base.Awake();
        attack = GetComponent<RangeEnemyAttack>();
    }

    override protected void Start()
    {
        base.Start();
        attack.StorePlayer(player);
    }

    private void Update()
    {
        if (!hasSpawned) return;
        ManageAttack();

        
    }

    private void ManageAttack()
    {
        float distanceToPlayer = Vector2.Distance(transform.position, player.transform.position);
        if (distanceToPlayer > playerDetectionRadius)
        {
            movement.FollowPlayer();
        }
        else
        {
            TryAttack();
        }
    }

    private void TryAttack()
    {
        attack.AutoAnim();
    }
}
```

## File: Enemy/RangeEnemyAttack.cs/RangeEnemyAttack.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Pool;

public class RangeEnemyAttack : MonoBehaviour
{
    [SerializeField] private Transform shootPoint;
    [SerializeField] private EnemyBullet bulletPrefabs;

    [SerializeField] private int damage = 1;
    [SerializeField] private float attackFrequency;

    private Player player;
    private float attackDelay;
    private float attackTimer;

    private Vector2 gizmosDirection;

    private ObjectPool<EnemyBullet> bulletPool;

    private void Start()
    {
        attackDelay = 1f / attackFrequency;
        attackTimer = attackDelay;

        bulletPool = new ObjectPool<EnemyBullet>(CreateFunction, ActionOnGet, ActionOnRelease, ActionOnDestroy);
    }


    private EnemyBullet CreateFunction()
    {
        EnemyBullet enemyBulletInstance = Instantiate(bulletPrefabs, shootPoint.position, Quaternion.identity);
        enemyBulletInstance.Configure(this);

        return enemyBulletInstance;
    }

    private void ActionOnGet(EnemyBullet bullet)
    {
        bullet.Reload();
        bullet.transform.position = shootPoint.position;
        bullet.gameObject.SetActive(true);
    }

    private void ActionOnRelease(EnemyBullet bullet)
    {
        bullet.gameObject.SetActive(false);
    }

    public void ActionOnDestroy(EnemyBullet bullet)
    {
        Destroy(bullet.gameObject);
    }


    public void AutoAnim()
    {
        ManageShooting();
    }

    private void ManageShooting()
    {
        attackTimer += Time.deltaTime;
        if (attackTimer >= attackDelay)
        {
            attackTimer = 0;
            Shooting();
        }
    }

    private void Shooting()
    {
        Vector2 direction = (player.GetCenter() - shootPoint.position).normalized;
        gizmosDirection = direction;

        EnemyBullet bulletGO = bulletPool.Get();
        bulletGO.ShootBullet(damage, direction);
    }

    public void StorePlayer(Player player)
    {
        this.player = player;
    }

    private void OnDrawGizmos()
    {
        Gizmos.color = Color.white;
        Gizmos.DrawLine(shootPoint.position, (Vector2)shootPoint.position + gizmosDirection * 5);
    }

    public void ReleaseBullet(EnemyBullet enemyBullet)
    {
        bulletPool.Release(enemyBullet);
    }
}
```

## File: GUI/CharacterButton.cs/CharacterButton.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CharacterButton : MonoBehaviour
{
    [SerializeField] private Image characterImage;
    [SerializeField] private GameObject lockObject;

    public Button Button
    {
        get { return GetComponent<Button>(); }
        private set { }
    }

    public void Configure(Sprite sprite, bool unlocked)
    {
        characterImage.sprite = sprite;
        if (unlocked)
        {
            UnLock();
        }
        else
        {
            Lock();
        }
    }

    public void Lock()
    {
        lockObject.SetActive(true);
        characterImage.color = Color.gray;
    }

    public void UnLock()
    {
        lockObject.SetActive(false);
        characterImage.color = Color.white;
    }


}
```

## File: GUI/CharacterInfoPanel.cs/CharacterInfoPanel.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class CharacterInfoPanel : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI txtName;
    [SerializeField] private TextMeshProUGUI txtPrice;
    [SerializeField] private GameObject priceContainer;
    [SerializeField] private Transform statsParent;

    [field: SerializeField] public Button Button { get; private set; }

    public void Configure(CharacterDataSO characterData, bool unlocked)
    {
        txtName.text = characterData.Name;
        txtPrice.text = characterData.PurchasePrice.ToString();
        priceContainer.SetActive(!unlocked);
        StatContainerManager.GenerateContainers(characterData.NonNeutralStats, statsParent);
    }

}
```

## File: GUI/ChestObjecContainer.cs/ChestObjecContainer.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class ChestObjecContainer : MonoBehaviour
{
    [SerializeField] private Image icon;
    [SerializeField] private TextMeshProUGUI txtName;
    [SerializeField] private TextMeshProUGUI txtRecyclePrice;
    [SerializeField] private Transform statContainersParent;

    [field: SerializeField] public Button TakeButton { get; private set; }
    [field: SerializeField] public Button RecycleButton { get; private set; }

    [SerializeField] private Image[] levelDependentImages;
    [SerializeField] private Image outLine;

    public void Configure(ObjectDataSO objectData)
    {
        icon.sprite = objectData.Sprite;
        txtName.text = objectData.Name;

        outLine.color = ColorHolder.GetOutLineColor(objectData.Rarity);
        Color imageColor = ColorHolder.GetColor(objectData.Rarity);
        txtName.color = imageColor;
        txtRecyclePrice.text = objectData.RecyclePrice.ToString();

        foreach (Image img in levelDependentImages)
        {
            img.color = imageColor;
        }

        ConfigureStatContainer(objectData.BaseStat);
    }

    private void ConfigureStatContainer(Dictionary<Stat, float> calculatedStat)
    {
        StatContainerManager.GenerateContainers(calculatedStat, statContainersParent);
    }
}
```

## File: GUI/CreditsScroller.cs/CreditsScroller.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CreditsScroller : MonoBehaviour
{
    [SerializeField] private int scrollSpeed = 2;

    private RectTransform rt;

    private void Awake()
    {
        rt = GetComponent<RectTransform>();
    }

    private void OnEnable()
    {
        rt.anchoredPosition = rt.anchoredPosition.With(y: 0);
    }

    private void Update()
    {
        rt.anchoredPosition += Vector2.up * Time.deltaTime * scrollSpeed;
    }
}
```

## File: GUI/CurrencyText.cs/CurrencyText.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class CurrencyText : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI txtCurrency;

    public void UpdateText(string currencyText)
    {
        txtCurrency.text = currencyText;
    }
}
```

## File: GUI/InventoryItem.cs/InventoryItem.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class InventoryItem : MonoBehaviour
{
    [SerializeField] private Image container;
    [SerializeField] private Image icon;
    [SerializeField] private Button button;

    public Weapon Weapon { get; private set; }
    public ObjectDataSO Object { get; private set; }

    public int Index { get; private set; }

    public void Configure(Color containerColor, Sprite itemIcon, Action callback)
    {
        container.color = containerColor;
        icon.sprite = itemIcon;

        button.onClick.RemoveAllListeners();
        button.onClick.AddListener(() => callback?.Invoke());
    }

    public void Configure(Weapon weapon, int index, Action callback)
    {
        Weapon = weapon;
        Index = index;
        container.color = ColorHolder.GetColor(weapon.Level);
        icon.sprite = weapon.WeaponData.Sprite; ;

        button.onClick.RemoveAllListeners();
        button.onClick.AddListener(() => callback?.Invoke());
    }

    public void Configure(ObjectDataSO objectData, Action callback)
    {
        Object = objectData;
        container.color = ColorHolder.GetColor(objectData.Rarity);
        icon.sprite = objectData.Sprite;

        button.onClick.RemoveAllListeners();
        button.onClick.AddListener(() => callback?.Invoke());
    }
}
```

## File: GUI/InventoryItemInfo.cs/InventoryItemInfo.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class InventoryItemInfo : MonoBehaviour
{
    [SerializeField] private Image icon;
    [SerializeField] private TextMeshProUGUI txtItemName;
    [SerializeField] private TextMeshProUGUI txtRecyclePrice;

    [SerializeField] private Image container;
    [SerializeField] private Transform statsParent;

    [field: SerializeField] public Button RecycleButton { get; private set; }
    [field: SerializeField] public Button CombineButton { get; private set; }

    public void Configure(Weapon weapon)
    {
        Configure(
            weapon.WeaponData.Sprite,
            weapon.WeaponData.Name,
            ColorHolder.GetColor(weapon.Level),
            WeaponStatsCalculator.GetRecyclePrice(weapon.WeaponData, weapon.Level),
            WeaponStatsCalculator.GetStats(weapon.WeaponData, weapon.Level)
        );

        CombineButton.gameObject.SetActive(true);
        CombineButton.interactable = WeaponMerger.Instance.CanMerge(weapon);
        CombineButton.onClick.RemoveAllListeners();
        CombineButton.onClick.AddListener(WeaponMerger.Instance.Merge);
    }

    public void Configure(ObjectDataSO objectData)
    {
        Configure(
            objectData.Sprite,
            objectData.Name,
            ColorHolder.GetColor(objectData.Rarity),
            objectData.RecyclePrice,
            objectData.BaseStat
        );

        CombineButton.gameObject.SetActive(false);
    }

    private void Configure(Sprite itemIcon, string itemName, Color clrContainer, int recyclePrice, Dictionary<Stat, float> stats)
    {
        icon.sprite = itemIcon;
        txtItemName.text = itemName;
        txtItemName.color = clrContainer;
        container.color = clrContainer;
        txtRecyclePrice.text = recyclePrice.ToString();
        StatContainerManager.GenerateContainers(stats, statsParent);
    }

}
```

## File: GUI/PlayerStatsDisplay.cs/PlayerStatsDisplay.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerStatsDisplay : MonoBehaviour, IPlayerStatsDepnedency
{
    [SerializeField] private Transform playerStatContainerParent;

    public void UpdateStats(PlayerStatsManager playerStatsManager)
    {
        int index = 0;

        foreach (Stat stat in Enum.GetValues(typeof(Stat)))
        {
            StatContainer statContainer = playerStatContainerParent.GetChild(index).GetComponent<StatContainer>();

            Sprite statIcon = ResourcesManager.GetStatIcon(stat);
            float statValue = playerStatsManager.GetStatValue(stat);
            statContainer.Configure(statIcon, Enums.FormatStatName(stat), statValue, true);
            statContainer.gameObject.SetActive(true);

            index++;
        }

        for (int i = index; i < playerStatContainerParent.childCount; i++)
        {
            playerStatContainerParent.GetChild(i).gameObject.SetActive(false);
        }
    }
}
```

## File: GUI/PremiumCurrencyText.cs/PremiumCurrencyText.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class PremiumCurrencyText : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI txtCurrency;

    public void UpdateText(string currencyText)
    {
        txtCurrency.text = currencyText;
    }
}
```

## File: GUI/ShopItemContainer.cs/ShopItemContainer.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class ShopItemContainer : MonoBehaviour
{
    [SerializeField] private Image icon;
    [SerializeField] private TextMeshProUGUI txtName;
    [SerializeField] private TextMeshProUGUI txtPrice;
    [SerializeField] private Transform statContainersParent;
    [SerializeField] private Image LockImage;
    [SerializeField] private Sprite lockSprite, unlockSprite;
    [SerializeField] public Button purchaseButton;
    [SerializeField] private Image[] levelDependentImages;
    [SerializeField] private Image outLine;

    private int weaponLevel;

    public bool IsLocked { get; private set; }
    public WeaponDataSO WeaponData { get; private set; }
    public ObjectDataSO ObjectData { get; private set; }
    public static Action<ShopItemContainer, int> onPurchase;

    private void Awake()
    {
        CurrencyManager.onUpdated += CurrencyUpdateCallback;
    }

    private void OnDestroy()
    {
        CurrencyManager.onUpdated -= CurrencyUpdateCallback;
    }

    private void Start()
    {
        UpdateLockVisual();
    }

    public void Configure(WeaponDataSO weaponData, int level)
    {
        WeaponData = weaponData;
        weaponLevel = level;
        icon.sprite = weaponData.Sprite;
        txtName.text = weaponData.Name;

        outLine.color = ColorHolder.GetOutLineColor(level);
        Color imageColor = ColorHolder.GetColor(level);
        txtName.color = imageColor;
        int price = WeaponStatsCalculator.GetPurchasePrice(weaponData, level);
        txtPrice.text = price.ToString();

        foreach (Image img in levelDependentImages)
        {
            img.color = imageColor;
        }

        purchaseButton.onClick.AddListener(Purchase);
        Dictionary<Stat, float> calculatedStat = WeaponStatsCalculator.GetStats(weaponData, level);
        ConfigureStatContainer(calculatedStat);
        purchaseButton.interactable = CurrencyManager.Instance.HasEnoughCurrency(price);

    }

    public void Configure(ObjectDataSO objectData)
    {
        ObjectData = objectData;
        icon.sprite = objectData.Sprite;
        txtName.text = objectData.Name;

        outLine.color = ColorHolder.GetOutLineColor(objectData.Rarity);
        Color imageColor = ColorHolder.GetColor(objectData.Rarity);
        txtName.color = imageColor;
        txtPrice.text = objectData.Price.ToString();

        foreach (Image img in levelDependentImages)
        {
            img.color = imageColor;
        }
        purchaseButton.onClick.AddListener(Purchase);
        ConfigureStatContainer(objectData.BaseStat);
        purchaseButton.interactable = CurrencyManager.Instance.HasEnoughCurrency(objectData.Price);

    }

    private void ConfigureStatContainer(Dictionary<Stat, float> stats)
    {
        statContainersParent.Clear();
        StatContainerManager.GenerateContainers(stats, statContainersParent);
    }

    public void LockButtonCallBack()
    {
        IsLocked = !IsLocked;
        UpdateLockVisual();
    }

    private void UpdateLockVisual()
    {
        LockImage.sprite = IsLocked ? lockSprite : unlockSprite;
    }

    private void Purchase()
    {
        onPurchase?.Invoke(this, weaponLevel);
    }

    private void CurrencyUpdateCallback()
    {
        int itemPrice;
        if (WeaponData != null)
        {
            itemPrice = WeaponStatsCalculator.GetPurchasePrice(WeaponData, weaponLevel);
        }
        else
        {
            itemPrice = ObjectData.Price;
        }

        purchaseButton.interactable = CurrencyManager.Instance.HasEnoughCurrency(itemPrice);
    }
}
```

## File: GUI/ShopManagerUI.cs/ShopManagerUI.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using NaughtyAttributes;
using UnityEngine;
using UnityEngine.UI;

public class ShopManagerUI : MonoBehaviour
{
    [SerializeField] private RectTransform playerStatPanel;
    [SerializeField] private RectTransform closePlayerStat;

    [SerializeField] private RectTransform playerInventoryPanel;
    [SerializeField] private RectTransform closeInventory;

    [SerializeField] private RectTransform itemInfoPanel;


    [Space(15)]
    [HorizontalLine]
    [SerializeField] private RectTransform s;

    private Vector2 playerStatsOpenedPos;
    private Vector2 playerStatsClosedPos;

    private Vector2 playerInventoryOpenedPos;
    private Vector2 playerInventoryClosedPos;

    private Vector2 itemInfoPanelOpenedPos;
    private Vector2 itemInfoPanelClosedPos;

    private IEnumerator Start()
    {
        yield return null;
        ConfigurePlayerStatPanel();
        ConfigurePlayerInventoryPanel();
        ConfigureItemInfoPanelPanel();
    }

    private void ConfigurePlayerStatPanel()
    {
        float width = Screen.width / (4 * playerStatPanel.lossyScale.x);
        playerStatPanel.offsetMax = playerStatPanel.offsetMax.With(x: width);

        playerStatsOpenedPos = playerStatPanel.anchoredPosition;
        playerStatsClosedPos = playerStatsOpenedPos + Vector2.left * width;

        playerStatPanel.anchoredPosition = playerStatsClosedPos;
        HidePlayerStat();
    }

    [NaughtyAttributes.Button]
    public void ShowPlayerStat()
    {
        playerStatPanel.gameObject.SetActive(true);
        closePlayerStat.gameObject.SetActive(true);
        closePlayerStat.GetComponent<Image>().raycastTarget = true;

        LeanTween.cancel(playerStatPanel);
        LeanTween.move(playerStatPanel, playerStatsOpenedPos, .5f).setEase(LeanTweenType.easeInCubic);

        LeanTween.cancel(closePlayerStat);
        LeanTween.alpha(closePlayerStat, .8f, .5f).setRecursive(false);
    }

    [NaughtyAttributes.Button]
    public void HidePlayerStat()
    {
        closePlayerStat.GetComponent<Image>().raycastTarget = false;
        LeanTween.cancel(playerStatPanel);
        LeanTween.move(playerStatPanel, playerStatsClosedPos, .5f).setEase(LeanTweenType.easeOutCubic).setOnComplete(() => playerStatPanel.gameObject.SetActive(false));

        LeanTween.cancel(closePlayerStat);
        LeanTween.alpha(closePlayerStat, 0, .5f).setRecursive(false).setOnComplete(() => closePlayerStat.gameObject.SetActive(false));
    }

    private void ConfigurePlayerInventoryPanel()
    {
        float width = Screen.width / (4 * playerInventoryPanel.lossyScale.x);
        playerInventoryPanel.offsetMin = playerInventoryPanel.offsetMin.With(x: -width);

        playerInventoryOpenedPos = playerInventoryPanel.anchoredPosition;
        playerInventoryClosedPos = playerStatsOpenedPos + Vector2.right * width;

        playerInventoryPanel.anchoredPosition = playerInventoryClosedPos;
        HidePlayerInventory(false);
    }

    [NaughtyAttributes.Button]
    public void ShowPlayerInventory()
    {
        playerInventoryPanel.gameObject.SetActive(true);
        closeInventory.gameObject.SetActive(true);
        closeInventory.GetComponent<Image>().raycastTarget = true;

        LeanTween.cancel(playerInventoryPanel);
        LeanTween.move(playerInventoryPanel, playerInventoryOpenedPos, .5f).setEase(LeanTweenType.easeInCubic);

        LeanTween.cancel(closeInventory);
        LeanTween.alpha(closeInventory, .8f, .5f).setRecursive(false);
    }

    [NaughtyAttributes.Button]
    public void HidePlayerInventory(bool hideItemInfo = true)
    {
        closeInventory.GetComponent<Image>().raycastTarget = false;
        LeanTween.cancel(playerInventoryPanel);
        LeanTween.move(playerInventoryPanel, playerInventoryClosedPos, .5f).setEase(LeanTweenType.easeOutCubic).setOnComplete(() => playerInventoryPanel.gameObject.SetActive(false));

        LeanTween.cancel(closeInventory);
        LeanTween.alpha(closeInventory, 0, .5f).setRecursive(false).setOnComplete(() => closeInventory.gameObject.SetActive(false));

        if (hideItemInfo)
            HideItemInfo();
    }

    private void ConfigureItemInfoPanelPanel()
    {
        float height = Screen.height / (2 * itemInfoPanel.lossyScale.y);
        itemInfoPanel.offsetMax = itemInfoPanel.offsetMax.With(y: height);

        itemInfoPanelOpenedPos = itemInfoPanel.anchoredPosition;
        itemInfoPanelClosedPos = itemInfoPanelOpenedPos + Vector2.down * height;

        itemInfoPanel.anchoredPosition = itemInfoPanelClosedPos;

    }

    [NaughtyAttributes.Button]
    public void ShowItemInfo()
    {
        itemInfoPanel.gameObject.SetActive(true);
        itemInfoPanel.LeanCancel();
        itemInfoPanel.LeanMove((Vector3)itemInfoPanelOpenedPos, .3f).setEase(LeanTweenType.easeOutCubic);
    }

    [NaughtyAttributes.Button]
    public void HideItemInfo()
    {
        itemInfoPanel.LeanCancel();
        itemInfoPanel.LeanMove((Vector3)itemInfoPanelClosedPos, .3f).setEase(LeanTweenType.easeInCubic).setOnComplete(() => itemInfoPanel.gameObject.SetActive(false));
    }
}
```

## File: GUI/StatContainer.cs/StatContainer.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class StatContainer : MonoBehaviour
{
    [SerializeField] private Image icon;
    [SerializeField] private TextMeshProUGUI txtName;
    [SerializeField] private TextMeshProUGUI txtValue;

    public void Configure(Sprite sprite, string name, float value, bool isColor = false)
    {
        icon.sprite = sprite;
        txtName.text = name;
        txtValue.text = value.ToString("F1");

        float sin = Mathf.Sign(value);
        if (value == 0) sin = 0;

        Color statTextColor = Color.white;
        statTextColor = sin < 0 ? Color.red : Color.green;
        if (sin == 0) statTextColor = Color.white;

        if (!isColor) return;

        txtValue.color = statTextColor;
        txtName.color = statTextColor;
    }

    public float GetFontSize()
    {
        return txtName.fontSize;
    }

    public void SetFontSize(float minFontSize)
    {
        txtName.fontSizeMax = minFontSize;
        txtValue.fontSizeMax = minFontSize;
    }
}
```

## File: GUI/UpgradeContainer.cs/UpgradeContainer.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class UpgradeContainer : MonoBehaviour
{
    [SerializeField] private Image image;
    [SerializeField] private TextMeshProUGUI txtUpgradeName;
    [SerializeField] private TextMeshProUGUI txtUpgradeValue;
    
    [field: SerializeField] public Button Button { get; private set; }

    public void Configure(Sprite icon, string upgradeName, string upgradeValue)
    {
        image.sprite = icon;
        txtUpgradeName.text = upgradeName;
        txtUpgradeValue.text = upgradeValue;
    }
}
```

## File: GUI/WaveManagerUI.cs/WaveManagerUI.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class WaveManagerUI : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI txtWave;
    [SerializeField] private TextMeshProUGUI txtTimer;

    public void UpdateTextWave(string waveString) => txtWave.text = waveString;
    public void UpdateTextTimer(string timerString) => txtTimer.text = timerString;
}
```

## File: GUI/WeaponSelectionContainer.cs/WeaponSelectionContainer.cs
```csharp
using System;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class WeaponSelectionContainer : MonoBehaviour
{
    [SerializeField] private Image icon;
    [SerializeField] private TextMeshProUGUI txtName;
    [SerializeField] private Transform statContainersParent;

    [field: SerializeField] public Button Button { get; private set; }

    [SerializeField] private Image[] levelDependentImages;
    [SerializeField] private Image outLine;

    public void Configure(WeaponDataSO weaponData, int level)
    {
        icon.sprite = weaponData.Sprite;
        txtName.text = weaponData.Name;

        outLine.color = ColorHolder.GetOutLineColor(level);
        Color imageColor = ColorHolder.GetColor(level);
        txtName.color = imageColor;
       
        foreach (Image img in levelDependentImages)
        {
            img.color = imageColor;
        }

        Dictionary<Stat, float> calculatedStat = WeaponStatsCalculator.GetStats(weaponData, level);
        ConfigureStatContainer(calculatedStat);

    }

    private void ConfigureStatContainer(Dictionary<Stat, float> calculatedStat)
    {
        StatContainerManager.GenerateContainers(calculatedStat, statContainersParent);
    }

    public void Select()
    {
        LeanTween.cancel(gameObject);
        LeanTween.scale(gameObject, Vector3.one * 1.075f, .3f).setEase(LeanTweenType.easeInOutSine);
    }

    public void Deselect()
    {
        LeanTween.cancel(gameObject);
        LeanTween.scale(gameObject, Vector3.one, .3f);
    }


}
```

## File: InfiniteMap/InfiniteChildMover.cs/InfiniteChildMover.cs
```csharp
using UnityEngine;

public class InfiniteChildMover : MonoBehaviour
{
    [SerializeField] private Transform playerTransform;
    [SerializeField] private float mapChunkSize;
    [SerializeField] private float distanceThreshold = 1.5f;

    private void Update()
    {
        UpdateChildren();
    }

    private void UpdateChildren()
    {
        for (int i = 0; i < transform.childCount; i++)
        {
            Transform child = transform.GetChild(i);

            Vector3 distance = playerTransform.position - child.position;
            float calculatedDistanceThreshold = mapChunkSize * distanceThreshold;

            if (Mathf.Abs(distance.x) > calculatedDistanceThreshold)
            {
                child.position += Vector3.right * calculatedDistanceThreshold * 2 * Mathf.Sign(distance.x);
            }

            if (Mathf.Abs(distance.y) > calculatedDistanceThreshold)
            {
                child.position += Vector3.up * calculatedDistanceThreshold * 2 * Mathf.Sign(distance.y);
            }
        }
    }
}
```

## File: InfiniteMap/InfiniteMap.cs/InfiniteMap.cs
```csharp
using System;
using UnityEngine;

public class InfiniteMap : MonoBehaviour
{
    [SerializeField] private GameObject mapChunkPrefab;
    [SerializeField] private float mapChunkSize;

    private void Start()
    {
        GenerateMap();
    }

    private void GenerateMap()
    {
        for (int x = -1; x <= 1; x++)
        {
            for (int y = -1; y <= 1; y++)
            {
                GenerateMapChunk(x, y);
            }
        }
    }

    private void GenerateMapChunk(int x, int y)
    {
        Vector3 spawnPos = new Vector3(x, y, 0) * mapChunkSize;
        Instantiate(mapChunkPrefab, spawnPos, Quaternion.identity, transform);
    }
}
```

## File: Interfaces/ICollectable.cs/ICollectable.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public interface ICollectable 
{
    public void Collect(Player player);
}
```

## File: Interfaces/IPlayerStatsDepnedency.cs/IPlayerStatsDepnedency.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public interface IPlayerStatsDepnedency
{
    void UpdateStats(PlayerStatsManager playerStatsManager);
}
```

## File: Managers/AudioManager.cs/AudioManager.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AudioManager : MonoBehaviour
{
    public static AudioManager Instance;

    public bool IsSFXOn { get; private set; }
    public bool IsBGMOn { get; private set; }

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
        }

        SettingsManager.onSfxStateChange += SFXStateChangeCallback;
        SettingsManager.onBgmStateChange += BGMStateChangeCallback;
    }

    private void OnDestroy()
    {
        SettingsManager.onSfxStateChange -= SFXStateChangeCallback;
        SettingsManager.onBgmStateChange -= BGMStateChangeCallback;
    }

    private void BGMStateChangeCallback(bool bgmState)
    {
        IsBGMOn = bgmState;
    }

    private void SFXStateChangeCallback(bool sfxState)
    {
        IsSFXOn = sfxState;
    }
}
```

## File: Managers/CameraController.cs/CameraController.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraController : MonoBehaviour
{
    [SerializeField] private Transform target;
    [SerializeField] private Vector2 minMaxXY;

    private void LateUpdate()
    {
        if (target == null) return;

        Vector3 targetPosition = target.position;
        targetPosition.z = -10;

        if(!GameHandler.Instance.UseInfiniteMap)
        {
            targetPosition.x = Mathf.Clamp(targetPosition.x, -minMaxXY.x, minMaxXY.x);
            targetPosition.y = Mathf.Clamp(targetPosition.y, -minMaxXY.y, minMaxXY.y);
        }

        transform.position = targetPosition;
    }
}
```

## File: Managers/CharacterSelectionManager.cs/CharacterSelectionManager.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using Tabsil.Sijil;
using UnityEngine;
using UnityEngine.UI;

public class CharacterSelectionManager : MonoBehaviour, IWantToBeSaved
{
    [SerializeField] private Transform characterButtonParent;
    [SerializeField] private CharacterButton characterButtonPrefab;
    [SerializeField] private Image centerCharacterImage;
    [SerializeField] private CharacterInfoPanel characterInfoPanel;

    private CharacterDataSO[] characterDatas;
    private int selectedCharacterIndex;
    private List<bool> unlockedStates = new List<bool>();
    private int lastSelectedCharacter;

    private const string unlockedStatesKey = "unlockedStatesKey";
    private const string lastSelectedCharacterKey = "lastSelectedCharacterKey";

    public static Action<CharacterDataSO> onCharacterSelected;

    private void Start()
    {
        characterInfoPanel.Button.onClick.RemoveAllListeners();
        characterInfoPanel.Button.onClick.AddListener(PurchaseCharacterSelected);

        CharacterSelectedCallback(lastSelectedCharacter);
    }

    private void Initialize()
    {
        characterButtonParent.Clear();

        for (int i = 0; i < characterDatas.Length; i++)
        {
            CreateCharacterButton(i);
        }
    }

    private void CreateCharacterButton(int index)
    {
        CharacterDataSO characterData = characterDatas[index];
        CharacterButton characterButton = Instantiate(characterButtonPrefab, characterButtonParent);
        characterButton.Configure(characterData.Sprite, unlockedStates[index]);
        characterButton.Button.onClick.RemoveAllListeners();
        characterButton.Button.onClick.AddListener(() => CharacterSelectedCallback(index));
    }

    private void CharacterSelectedCallback(int index)
    {
        selectedCharacterIndex = index;
        CharacterDataSO characterData = characterDatas[index];
        centerCharacterImage.sprite = characterData.Sprite;
        characterInfoPanel.Configure(characterData, unlockedStates[index]);

        if (unlockedStates[index])
        {
            lastSelectedCharacter = index;
            characterInfoPanel.Button.interactable = false;
            Save();

            onCharacterSelected?.Invoke(characterData);
        }
        else
        {
            characterInfoPanel.Button.interactable = CurrencyManager.Instance.HasEnoughPremiumCurrency(characterData.PurchasePrice);
        }
    }

    private void PurchaseCharacterSelected()
    {
        int price = characterDatas[selectedCharacterIndex].PurchasePrice;
        CurrencyManager.Instance.UsePremiumCurrency(price);
        unlockedStates[selectedCharacterIndex] = true;

        characterButtonParent.GetChild(selectedCharacterIndex).GetComponent<CharacterButton>().UnLock();
        CharacterSelectedCallback(selectedCharacterIndex);

        Save();
    }

    public void Load()
    {
        characterDatas = ResourcesManager.Characters;
        for (int i = 0; i < characterDatas.Length; i++)
        {
            unlockedStates.Add(i == 0);
        }

        if (Sijil.TryLoad(this, unlockedStatesKey, out object unlockedStatesObject))
        {
            unlockedStates = (List<bool>)unlockedStatesObject;
        }

        if (Sijil.TryLoad(this, lastSelectedCharacterKey, out object lastSelectedCharacterObject))
        {
            lastSelectedCharacter = (int)lastSelectedCharacterObject;
        }

        Initialize();

    }

    public void Save()
    {
        Sijil.Save(this, unlockedStatesKey, unlockedStates);
        Sijil.Save(this, lastSelectedCharacterKey, lastSelectedCharacter);
    }
}
```

## File: Managers/ColorHolder.cs/ColorHolder.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ColorHolder : MonoBehaviour
{
    [SerializeField] private PaletteSO palette;

    public static ColorHolder Instance;

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
        }
    }

    public static Color GetColor(int level)
    {
        level = Mathf.Clamp(level, 0, Instance.palette.LevelColors.Length);
        return Instance.palette.LevelColors[level];
    }

    public static Color GetOutLineColor(int level)
    {
        level = Mathf.Clamp(level, 0, Instance.palette.LevelOutLineColors.Length);
        return Instance.palette.LevelOutLineColors[level];
    }

}
```

## File: Managers/CurrencyManager.cs/CurrencyManager.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Tabsil.Sijil;

public class CurrencyManager : MonoBehaviour, IWantToBeSaved
{
    [field: SerializeField] public int Currency { get; private set; }
    [field: SerializeField] public int PremiumCurrency { get; private set; }

    const string PremiumCurrencyKey = "premiumCurrency";

    public static CurrencyManager Instance;

    public static Action onUpdated;

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
        }

        Candy.onCollected += CandyCollectedCallback;
        Cash.onCollected += CashCollectedCallback;

        // AddPremiumCurrency(PlayerPrefs.GetInt(PremiumCurrencyKey), false);

    }

    private void OnDestroy()
    {
        Candy.onCollected -= CandyCollectedCallback;
        Cash.onCollected -= CashCollectedCallback;
    }

    private void Start()
    {
        UpdateTexts();
    }

    [NaughtyAttributes.Button]
    private void AddCurrency500() => AddCurrency(500);

    [NaughtyAttributes.Button]
    private void AddPremiumCurrency500() => AddPremiumCurrency(500);

    public void Load()
    {
        if (Sijil.TryLoad(this, PremiumCurrencyKey, out object premiumCurrencyValue))
        {
            AddPremiumCurrency((int)premiumCurrencyValue, false);
        }
        else
        {
            AddPremiumCurrency(0, false);
        }
    }

    public void Save()
    {
        Sijil.Save(this, PremiumCurrencyKey, PremiumCurrency);
    }

    public void AddCurrency(int amount)
    {
        Currency += amount;
        UpdateVisuals();
    }

    public void AddPremiumCurrency(int amount, bool save = true)
    {
        PremiumCurrency += amount;
        UpdateVisuals();

        // if (save) PlayerPrefs.SetInt(PremiumCurrencyKey, PremiumCurrency);
    }

    private void UpdateVisuals()
    {
        UpdateTexts();
        onUpdated?.Invoke();

        Save();
    }

    private void UpdateTexts()
    {
        CurrencyText[] currencyTexts = FindObjectsByType<CurrencyText>(FindObjectsInactive.Include, FindObjectsSortMode.None);
        foreach (CurrencyText text in currencyTexts)
        {
            text.UpdateText(Currency.ToString());
        }

        PremiumCurrencyText[] premiumCurrencyTexts = FindObjectsByType<PremiumCurrencyText>(FindObjectsInactive.Include, FindObjectsSortMode.None);
        foreach (PremiumCurrencyText text in premiumCurrencyTexts)
        {
            text.UpdateText(PremiumCurrency.ToString());
        }
    }

    public bool HasEnoughCurrency(int price) => Currency >= price;
    public bool HasEnoughPremiumCurrency(int price) => PremiumCurrency >= price;
    public void UseCurrency(int price) => AddCurrency(-price);
    public void UsePremiumCurrency(int price) => AddPremiumCurrency(-price);
    private void CandyCollectedCallback(Candy candy) => AddCurrency(1);
    private void CashCollectedCallback(Cash cash) => AddPremiumCurrency(1);
}
```

## File: Managers/DamageTextManager.cs/DamageTextManager.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Pool;


public class DamageTextManager : MonoBehaviour
{
    [SerializeField] private DamageText damageTextPrefabs;

    private ObjectPool<DamageText> damageTextPool;

    private void Awake()
    {
        Enemy.onDamageTaken += InstantiateDamageText;
        PlayerHealth.onAttackDodged += AttackDodgedCallback;
    }

    private void OnDestroy()
    {
        Enemy.onDamageTaken -= InstantiateDamageText;
        PlayerHealth.onAttackDodged -= AttackDodgedCallback;
    }

    private void Start()
    {
        damageTextPool = new ObjectPool<DamageText>(CreateFunction, ActionOnGet, ActionOnRelease, ActionOnDestroy);
    }

    private DamageText CreateFunction() => Instantiate(damageTextPrefabs, transform);

    private void ActionOnGet(DamageText text) => text.gameObject.SetActive(true);

    private void ActionOnRelease(DamageText text)
    {
        if (text == null) return;
        text.gameObject.SetActive(false);
    }
    private void ActionOnDestroy(DamageText text) => Destroy(text.gameObject);

    private void InstantiateDamageText(int damage, Vector2 pos, bool isCriticalHit)
    {
        DamageText damageTextIns = damageTextPool.Get();

        Vector3 spawnPosition = pos + Vector2.up * 0;
        damageTextIns.transform.position = spawnPosition;

        damageTextIns.PlayAnim(damage.ToString(), isCriticalHit);
        LeanTween.delayedCall(1, () => damageTextPool.Release(damageTextIns));
    }

    private void AttackDodgedCallback(Vector2 pos)
    {
        DamageText damageTextIns = damageTextPool.Get();

        Vector3 spawnPosition = pos + Vector2.up * 0;
        damageTextIns.transform.position = spawnPosition;

        damageTextIns.PlayAnim("Dodge", false);
        LeanTween.delayedCall(1, () => damageTextPool.Release(damageTextIns));
    }

}
```

## File: Managers/DropManager.cs/DropManager.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Pool;

public class DropManager : MonoBehaviour
{
    [SerializeField] private Candy candyPrefab;
    [SerializeField] private Cash cashPrefab;
    [SerializeField] private Chest chestPrefab;

    [SerializeField][Range(0, 100)] int cashDropChance = 20;
    [SerializeField][Range(0, 100)] int chestDropChance = 10;

    private ObjectPool<Candy> candyPool;
    private ObjectPool<Cash> cashPool;
    private ObjectPool<Chest> chestPool;

    private void Awake()
    {
        Enemy.onPassedAway += Enemy_onPassedAway;
        Candy.onCollected += OnReleaseCandy;
        Cash.onCollected += OnReleaseCash;
        Chest.onCollected += OnReleaseChest;
    }

    private void Start()
    {
        candyPool = new ObjectPool<Candy>(CandyCreateFunction, CandyActionOnGet, CandyActionOnRelease, CandyActionOnDestroy);
        cashPool = new ObjectPool<Cash>(CashCreateFunction, CashActionOnGet, CashActionOnRelease, CashActionOnDestroy);
        chestPool = new ObjectPool<Chest>(ChestCreateFunction, ChestActionOnGet, ChestActionOnRelease, ChestActionOnDestroy);
    }

    private void OnDestroy()
    {
        Enemy.onPassedAway -= Enemy_onPassedAway;
        Candy.onCollected -= OnReleaseCandy;
        Cash.onCollected -= OnReleaseCash;
        Chest.onCollected -= OnReleaseChest;
    }

    private Candy CandyCreateFunction() => Instantiate(candyPrefab, transform);
    private void CandyActionOnGet(Candy candy) => candy.gameObject.SetActive(true);
    private void CandyActionOnRelease(Candy candy) => candy.gameObject.SetActive(false);
    private void CandyActionOnDestroy(Candy candy) => Destroy(candy.gameObject);

    private Cash CashCreateFunction() => Instantiate(cashPrefab, transform);
    private void CashActionOnGet(Cash cash) => cash.gameObject.SetActive(true);
    private void CashActionOnRelease(Cash cash) => cash.gameObject.SetActive(false);
    private void CashActionOnDestroy(Cash cash) => Destroy(cash.gameObject);

    private Chest ChestCreateFunction() => Instantiate(chestPrefab, transform);
    private void ChestActionOnGet(Chest chest) => chest.gameObject.SetActive(true);
    private void ChestActionOnRelease(Chest chest) => chest.gameObject.SetActive(false);
    private void ChestActionOnDestroy(Chest chest) => Destroy(chest.gameObject);

    private void Enemy_onPassedAway(Vector2 pos)
    {
        bool shouldSpawnCash = Random.Range(0, 100) < cashDropChance;

        DroppableCurrency droppable = shouldSpawnCash ? cashPool.Get() : candyPool.Get();
        droppable.transform.position = pos;

        bool shouldSpawnChest = Random.Range(0, 100) < chestDropChance;
        if (!shouldSpawnChest) return;

        Chest chest = chestPool.Get();
        chest.transform.position = pos + Vector2.right;
    }

    private void OnReleaseCash(Cash cash) => cashPool.Release(cash);
    private void OnReleaseCandy(Candy candy) => candyPool.Release(candy);
    private void OnReleaseChest(Chest chest) => chestPool.Release(chest);
}
```

## File: Managers/Enums.cs/Enums.cs
```csharp
public enum GameState
{
    MENU,
    WEAPONSELECTION,
    GAME,
    GAMEOVER,
    STAGECOMPLETE,
    WAVETRANSITION,
    SHOP,
}

public enum Stat
{
    Attack,
    AttackSpeed,
    CriticalChance,
    CriticalPercent,
    MoveSpeed,
    MaxHealth,
    Range,
    HealthRecoverySpeed,
    Armor,
    Luck,
    Dodge,
    LifeSteal
}

public static class Enums
{
    public static string FormatStatName(Stat stat)
    {
        string formated = "";
        string unformatedString = stat.ToString();

        if (unformatedString.Length <= 0) return "";


        formated += unformatedString[0];

        for (int i = 1; i < unformatedString.Length; i++)
        {
            if (char.IsUpper(unformatedString[i]))
                formated += " ";
            formated += unformatedString[i];
        }

        return formated;
    }
}
```

## File: Managers/GameHandler.cs/GameHandler.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameHandler : MonoBehaviour
{
    [field: SerializeField] public bool UseInfiniteMap { get; private set; }

    public static Action onGamePaused;
    public static Action onGameResumed;
    public static GameHandler Instance;

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
        }
    }

    private void Start()
    {
        Application.targetFrameRate = 60;
        SetGameState(GameState.MENU);
    }

    public void SetGameState(GameState state)
    {
        IEnumerable<IGameStateListener> gameStateListeners = FindObjectsByType<MonoBehaviour>(FindObjectsSortMode.None).OfType<IGameStateListener>();

        foreach (IGameStateListener gameStateListener in gameStateListeners)
        {
            gameStateListener.GameStateChangeCallback(state);
        }
    }

    public void StartGame() => SetGameState(GameState.GAME);
    public void WeaponSelection() => SetGameState(GameState.WEAPONSELECTION);
    public void StartShop() => SetGameState(GameState.SHOP);

    public void ManageGameOver()
    {
        SceneManager.LoadScene(0);
    }

    public void WaveCompleteCallBack()
    {
        if (Player.Instance.HasLevelUp() || WaveTransitionManager.Instance.HasChestCollected())
        {
            SetGameState(GameState.WAVETRANSITION);
        }
        else
        {
            SetGameState(GameState.SHOP);
        }
    }

    public void PauseButtonCallback()
    {
        Time.timeScale = 0;
        onGamePaused?.Invoke();
    }

    public void ResumeButtonCallback()
    {
        Time.timeScale = 1;
        onGameResumed?.Invoke();
    }

    public void RestartFromPause()
    {
        Time.timeScale = 1;
        ManageGameOver();
    }
}

public interface IGameStateListener
{
    void GameStateChangeCallback(GameState gameState);
}
```

## File: Managers/InventoryManager.cs/InventoryManager.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InventoryManager : MonoBehaviour, IGameStateListener
{
    [SerializeField] private PlayerObjects playerObjects;
    [SerializeField] private PlayerWeapons playerWeapons;

    [SerializeField] private Transform inventoryItemParent;
    [SerializeField] private Transform pauseInventoryItemParent;
    [SerializeField] private InventoryItem inventoryItem;

    [SerializeField] private ShopManagerUI shopManagerUI;
    [SerializeField] private InventoryItemInfo itemInfo;


    private void Awake()
    {
        ShopManager.onItemPurchase += ItemPurchaseCallback;
        WeaponMerger.onMerge += WeaponMergerCallback;
        GameHandler.onGamePaused += Configure;
    }

    private void OnDestroy()
    {
        ShopManager.onItemPurchase -= ItemPurchaseCallback;
        WeaponMerger.onMerge -= WeaponMergerCallback;
        GameHandler.onGamePaused -= Configure;
    }

    public void GameStateChangeCallback(GameState gameState)
    {
        if (gameState == GameState.SHOP)
        {
            Configure();
        }
    }

    private void ItemPurchaseCallback() => Configure();

    private void Configure()
    {
        inventoryItemParent.Clear();
        pauseInventoryItemParent.Clear();

        Weapon[] weapons = playerWeapons.GetWeapons();

        for (int i = 0; i < weapons.Length; i++)
        {
            if (weapons[i] == null) continue;
            InventoryItem item = Instantiate(inventoryItem, inventoryItemParent);
            item.Configure(weapons[i], i, () => ShowItemInfo(item));

            InventoryItem items = Instantiate(inventoryItem, pauseInventoryItemParent);
            items.Configure(weapons[i], i, null);
        }

        ObjectDataSO[] objectDatas = playerObjects.Objects.ToArray();

        for (int i = 0; i < objectDatas.Length; i++)
        {
            InventoryItem item = Instantiate(inventoryItem, inventoryItemParent);
            item.Configure(objectDatas[i], () => ShowItemInfo(item));

            InventoryItem items = Instantiate(inventoryItem, inventoryItemParent);
            items.Configure(objectDatas[i], null);
        }
    }

    private void ShowItemInfo(InventoryItem item)
    {
        if (item.Weapon != null)
        {
            ShowWeaponInfo(item.Weapon, item.Index);
        }
        else
        {
            ShowObjectInfo(item.Object);
        }
    }

    private void ShowWeaponInfo(Weapon weapon, int index)
    {
        itemInfo.Configure(weapon);
        itemInfo.RecycleButton.onClick.RemoveAllListeners();
        itemInfo.RecycleButton.onClick.AddListener(() => RecycleWeapon(index));
        shopManagerUI.ShowItemInfo();
    }

    private void ShowObjectInfo(ObjectDataSO objectData)
    {
        itemInfo.Configure(objectData);
        itemInfo.RecycleButton.onClick.RemoveAllListeners();
        itemInfo.RecycleButton.onClick.AddListener(() => RecycleObject(objectData));
        shopManagerUI.ShowItemInfo();
    }

    private void RecycleObject(ObjectDataSO objectData)
    {
        playerObjects.RecycleObject(objectData);
        Configure();
        shopManagerUI.HideItemInfo();
    }

    private void RecycleWeapon(int index)
    {
        playerWeapons.RecycleWeapon(index);
        Configure();
        shopManagerUI.HideItemInfo();
    }

    private void WeaponMergerCallback(Weapon weapon)
    {
        Configure();
        itemInfo.Configure(weapon);
    }
}
```

## File: Managers/PlayerStatsManager.cs/PlayerStatsManager.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class PlayerStatsManager : MonoBehaviour
{
    [SerializeField] private CharacterDataSO playerData;

    private Dictionary<Stat, float> playerStats = new Dictionary<Stat, float>();
    private Dictionary<Stat, float> addends = new Dictionary<Stat, float>();
    private Dictionary<Stat, float> objectAddends = new Dictionary<Stat, float>();

    private void Awake()
    {
        CharacterSelectionManager.onCharacterSelected += CharacterSelectedCallback;

        playerStats = playerData.BaseStat;

        foreach (KeyValuePair<Stat, float> kvp in playerStats)
        {
            addends.Add(kvp.Key, 0);
            objectAddends.Add(kvp.Key, 0);
        }
    }

    private void OnDestroy()
    {
        CharacterSelectionManager.onCharacterSelected -= CharacterSelectedCallback;
    }

    private void Start()
    {
        UpdatePlayerStats();
    }

    public void AddPlayerStat(Stat stat, float value)
    {
        if (addends.ContainsKey(stat))
        {
            addends[stat] += value;
        }
        else
        {
            Debug.LogWarning($"The key {stat} has not been found");
        }

        UpdatePlayerStats();
    }

    public float GetStatValue(Stat stat) => playerStats[stat] + addends[stat] + objectAddends[stat];

    private void UpdatePlayerStats()
    {
        IEnumerable<IPlayerStatsDepnedency> playerStatsDepnedencies = FindObjectsByType<MonoBehaviour>(FindObjectsInactive.Include, FindObjectsSortMode.None).OfType<IPlayerStatsDepnedency>();

        foreach (IPlayerStatsDepnedency depnedency in playerStatsDepnedencies)
        {
            depnedency.UpdateStats(this);
        }
    }

    public void AddObject(Dictionary<Stat, float> objectStats)
    {
        foreach (KeyValuePair<Stat, float> kvp in objectStats)
        {
            if (objectAddends.ContainsKey(kvp.Key))
            {
                objectAddends[kvp.Key] += kvp.Value;
            }
        }

        UpdatePlayerStats();
    }

    public void RemoveObjectStat(Dictionary<Stat, float> objectStats)
    {
        foreach (KeyValuePair<Stat, float> kvp in objectStats)
        {
            if (objectAddends.ContainsKey(kvp.Key))
            {
                objectAddends[kvp.Key] -= kvp.Value;
            }
        }

        UpdatePlayerStats();
    }

    private void CharacterSelectedCallback(CharacterDataSO data)
    {
        playerData = data;
        playerStats = data.BaseStat;

        UpdatePlayerStats();
    }

}
```

## File: Managers/ResourcesManager.cs/ResourcesManager.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class ResourcesManager
{
    const string statIconDataPath = "Data/Stat Icons";
    const string objectDataPath = "Data/Objects/";
    const string weaponDataPath = "Data/Weapons/";
    const string characterDataPath = "Data/Characters/";

    private static StatIcon[] statIcons;

    public static Sprite GetStatIcon(Stat stat)
    {
        if (statIcons == null)
        {
            StatIconDataSO data = Resources.Load<StatIconDataSO>(statIconDataPath);
            statIcons = data.StatIcons;
        }

        foreach (StatIcon statIcon in statIcons)
        {
            if (stat == statIcon.stat)
            {
                return statIcon.sprite;
            }
        }

        return null;
    }


    private static ObjectDataSO[] objectDatas;
    public static ObjectDataSO[] Objects
    {
        get
        {
            if (objectDatas == null)
            {
                objectDatas = Resources.LoadAll<ObjectDataSO>(objectDataPath);
            }
            return objectDatas;
        }
        private set { }
    }

    public static ObjectDataSO GetRandomObject()
    {
        return Objects[Random.Range(0, Objects.Length)];
    }

    private static WeaponDataSO[] weaponDataSOs;
    public static WeaponDataSO[] Weapons
    {
        get
        {
            if (weaponDataSOs == null)
            {
                weaponDataSOs = Resources.LoadAll<WeaponDataSO>(weaponDataPath);
            }
            return weaponDataSOs;
        }
        private set { }
    }

    public static WeaponDataSO GetRandomWeapon()
    {
        return Weapons[Random.Range(0, Weapons.Length)];
    }

    private static CharacterDataSO[] characterDataSOs;
    public static CharacterDataSO[] Characters
    {
        get
        {
            if (characterDataSOs == null)
            {
                characterDataSOs = Resources.LoadAll<CharacterDataSO>(characterDataPath);
            }
            return characterDataSOs;
        }
        private set { }
    }
}
```

## File: Managers/SettingsManager.cs/SettingsManager.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using Tabsil.Sijil;
using TMPro;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;

public class SettingsManager : MonoBehaviour, IWantToBeSaved
{

    [SerializeField] private Color onColor;
    [SerializeField] private Color offColor;

    [SerializeField] private Button sfxButton;
    [SerializeField] private Button bgmButton;
    [SerializeField] private Button policyButton;
    [SerializeField] private Button askButton;
    [SerializeField] private GameObject creditsPanel;

    private bool sfxState;
    private bool bgmState;

    private const string sfxStateKey = "sfxStateKey";
    private const string bgmStateKey = "bgmStateKey";

    public static Action<bool> onSfxStateChange;
    public static Action<bool> onBgmStateChange;

    private void Awake()
    {
        sfxButton.onClick.RemoveAllListeners();
        sfxButton.onClick.AddListener(SFXButtonCallback);

        bgmButton.onClick.RemoveAllListeners();
        bgmButton.onClick.AddListener(BGMButtonCallback);

        policyButton.onClick.RemoveAllListeners();
        policyButton.onClick.AddListener(PrivacyPolicyButtonCallback);

        askButton.onClick.RemoveAllListeners();
        askButton.onClick.AddListener(AskButtonCallback);

        HideCreditsPanel();
    }

    private void Start()
    {
        onSfxStateChange?.Invoke(sfxState);
        onBgmStateChange?.Invoke(bgmState);
    }

    private void SFXButtonCallback()
    {
        sfxState = !sfxState;
        UpdateSFXButtonVisuals();
        Save();
    }

    private void BGMButtonCallback()
    {
        bgmState = !bgmState;
        UpdateBGMButtonVisuals();
        Save();
    }

    private void UpdateSFXButtonVisuals()
    {
        if (sfxState)
        {
            sfxButton.image.color = onColor;
            sfxButton.GetComponentInChildren<TextMeshProUGUI>().text = "On";
        }
        else
        {
            sfxButton.image.color = offColor;
            sfxButton.GetComponentInChildren<TextMeshProUGUI>().text = "Off";
        }

        onSfxStateChange?.Invoke(sfxState);
    }
    private void UpdateBGMButtonVisuals()
    {
        if (bgmState)
        {
            bgmButton.image.color = onColor;
            bgmButton.GetComponentInChildren<TextMeshProUGUI>().text = "On";
        }
        else
        {
            bgmButton.image.color = offColor;
            bgmButton.GetComponentInChildren<TextMeshProUGUI>().text = "Off";
        }

        onBgmStateChange?.Invoke(bgmState);
    }

    public void Load()
    {
        bgmState = true;
        sfxState = true;

        if (Sijil.TryLoad(this, bgmStateKey, out object bgmStateObject))
        {
            bgmState = (bool)bgmStateObject;
        }

        if (Sijil.TryLoad(this, sfxStateKey, out object sfxStateObject))
        {
            sfxState = (bool)sfxStateObject;
        }

        UpdateBGMButtonVisuals();
        UpdateSFXButtonVisuals();

    }

    public void ShowCreditsPanel() => creditsPanel.SetActive(true);
    public void HideCreditsPanel() => creditsPanel.SetActive(false);

    private void PrivacyPolicyButtonCallback()
    {
        Application.OpenURL("https://www.youtube.com/");
    }

    private void AskButtonCallback()
    {
        string email = "nduongphuc@gmail.com";
        string subject = MyEscapeURL("Demonslayer");
        string body = MyEscapeURL("I need help with this ...");

        Application.OpenURL("mailto:" + email + "?subject=" + subject + "&body=" + body);
    }

    private string MyEscapeURL(string s)
    {
        return UnityWebRequest.EscapeURL(s).Replace("+", "%20");
    }

    public void Save()
    {
        Sijil.Save(this, sfxStateKey, sfxState);
        Sijil.Save(this, bgmStateKey, bgmState);
    }
}
```

## File: Managers/ShopManager.cs/ShopManager.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using Random = UnityEngine.Random;

public class ShopManager : MonoBehaviour, IGameStateListener
{
    [SerializeField] private Transform containerParent;
    [SerializeField] private ShopItemContainer shopItemPrefab;

    [SerializeField] private Button rerollButton;
    [SerializeField] private int rerollPrice;
    [SerializeField] private TextMeshProUGUI txtRerollPrice;

    [SerializeField] private PlayerWeapons playerWeapons;
    [SerializeField] private PlayerObjects playerObjects;

    public static Action onItemPurchase;

    private void Awake()
    {
        CurrencyManager.onUpdated += CurrencyUpdateCallback;
        ShopItemContainer.onPurchase += ItemPurchaseCallback;
    }

    private void OnDestroy()
    {
        CurrencyManager.onUpdated -= CurrencyUpdateCallback;
        ShopItemContainer.onPurchase -= ItemPurchaseCallback;
    }

    public void GameStateChangeCallback(GameState gameState)
    {
        if (gameState == GameState.SHOP)
        {
            Configure();
            UpdateRerollVisuals();
        }
    }

    private void Configure()
    {
        List<GameObject> toDestroy = new List<GameObject>();

        for (int i = 0; i < containerParent.childCount; i++)
        {
            ShopItemContainer shopItem = containerParent.GetChild(i).GetComponent<ShopItemContainer>();
            if (!shopItem.IsLocked)
            {
                toDestroy.Add(shopItem.gameObject);
            }
        }

        while (toDestroy.Count > 0)
        {
            Transform t = toDestroy[0].transform;
            t.SetParent(null);
            Destroy(t.gameObject);
            toDestroy.RemoveAt(0);
        }

        int containerToAdd = 5 - containerParent.childCount;
        int weaponContainersCount = Random.Range(0, containerToAdd);
        int objectContainerCount = containerToAdd - weaponContainersCount;

        for (int i = 0; i < weaponContainersCount; i++)
        {
            ShopItemContainer weapon = Instantiate(shopItemPrefab, containerParent);
            WeaponDataSO weaponData = ResourcesManager.GetRandomWeapon();
            weapon.Configure(weaponData, 0);
        }

        for (int i = 0; i < objectContainerCount; i++)
        {
            ShopItemContainer item = Instantiate(shopItemPrefab, containerParent);
            ObjectDataSO randomObject = ResourcesManager.GetRandomObject();
            item.Configure(randomObject);
        }
    }

    public void Reroll()
    {
        Configure();
        CurrencyManager.Instance.UseCurrency(rerollPrice);
    }

    private void UpdateRerollVisuals()
    {
        txtRerollPrice.text = rerollPrice.ToString();
        rerollButton.interactable = CurrencyManager.Instance.HasEnoughCurrency(rerollPrice);
    }

    private void CurrencyUpdateCallback()
    {
        UpdateRerollVisuals();
    }

    private void ItemPurchaseCallback(ShopItemContainer container, int level)
    {
        if (container.WeaponData != null)
        {
            TryPurchaseWeapon(container, level);
        }
        else
        {
            PurchaseObject(container);
        }
    }

    private void PurchaseObject(ShopItemContainer container)
    {
        playerObjects.AddObject(container.ObjectData);
        CurrencyManager.Instance.UseCurrency(container.ObjectData.Price);
        Destroy(container.gameObject);

        onItemPurchase?.Invoke();
    }

    private void TryPurchaseWeapon(ShopItemContainer container, int level)
    {
        if (playerWeapons.TryAddWeapon(container.WeaponData, level))
        {
            int price = WeaponStatsCalculator.GetPurchasePrice(container.WeaponData, level);
            CurrencyManager.Instance.UseCurrency(price);

            Destroy(container.gameObject);
        }

        onItemPurchase?.Invoke();
    }
}
```

## File: Managers/StatContainerManager.cs/StatContainerManager.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StatContainerManager : MonoBehaviour
{
    [SerializeField] private StatContainer statContainerPrefab;

    public static StatContainerManager Instance;

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
        }
    }

    private void GenerateContainer(Dictionary<Stat, float> statDictionary, Transform statContainersParent)
    {
        List<StatContainer> statContainers = new List<StatContainer>();

        foreach (KeyValuePair<Stat, float> kvp in statDictionary)
        {
            StatContainer containerInstance = Instantiate(statContainerPrefab, statContainersParent);
            statContainers.Add(containerInstance);
            containerInstance.Configure(ResourcesManager.GetStatIcon(kvp.Key), Enums.FormatStatName(kvp.Key), kvp.Value);
        }

        LeanTween.delayedCall(Time.deltaTime * 2, () => ResizeTexts(statContainers));
    }

    private void ResizeTexts(List<StatContainer> statContainers)
    {
        float minFontSize = 5000;
        for (int i = 0; i < statContainers.Count; i++)
        {
            StatContainer statContainer = statContainers[i];
            float fontSize = statContainer.GetFontSize();
            if (fontSize < minFontSize)
            {
                minFontSize = fontSize;
            }
        }

        for (int i = 0; i < statContainers.Count; i++)
        {
            statContainers[i].SetFontSize(minFontSize);
        }
    }

    public static void GenerateContainers(Dictionary<Stat, float> statDictionary, Transform statContainersParent)
    {
        statContainersParent.Clear();
        Instance.GenerateContainer(statDictionary, statContainersParent);
    }
}
```

## File: Managers/UIManager.cs/UIManager.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class UIManager : MonoBehaviour, IGameStateListener
{
    [SerializeField] private GameObject menuPanel;
    [SerializeField] private GameObject weaponSelectionPanel;
    [SerializeField] private GameObject gamePanel;
    [SerializeField] private GameObject gameOverPanel;
    [SerializeField] private GameObject stageCompletePanel;
    [SerializeField] private GameObject waveTransitionPanel;
    [SerializeField] private GameObject shopPanel;
    [SerializeField] private GameObject pausePanel;
    [SerializeField] private GameObject restartConfirmationPanel;
    [SerializeField] private GameObject characterSelectionPanel;
    [SerializeField] private GameObject settingsPanel;

    private List<GameObject> panels = new List<GameObject>();

    private void Awake()
    {
        panels.AddRange(new GameObject[] {
            menuPanel,
            weaponSelectionPanel,
            gamePanel,
            gameOverPanel,
            stageCompletePanel,
            waveTransitionPanel,
            shopPanel
        });

        GameHandler.onGamePaused += GamePausedCallback;
        GameHandler.onGameResumed += GameResumedCallback;

        pausePanel.SetActive(false);
        characterSelectionPanel.SetActive(false);
        HideRestartConfirmationPanel();
        HideSettingPanel();
    }

    private void OnDestroy()
    {
        GameHandler.onGamePaused -= GamePausedCallback;
        GameHandler.onGameResumed -= GameResumedCallback;
    }

    public void GameStateChangeCallback(GameState gameState)
    {
        switch (gameState)
        {
            case GameState.MENU:
                ShowPanel(menuPanel);
                break;

            case GameState.WEAPONSELECTION:
                ShowPanel(weaponSelectionPanel);
                break;

            case GameState.GAME:
                ShowPanel(gamePanel);
                break;

            case GameState.GAMEOVER:
                ShowPanel(gameOverPanel);
                break;

            case GameState.STAGECOMPLETE:
                ShowPanel(stageCompletePanel);
                break;

            case GameState.WAVETRANSITION:
                ShowPanel(waveTransitionPanel);
                break;

            case GameState.SHOP:
                ShowPanel(shopPanel);
                break;
        }
    }

    private void ShowPanel(GameObject panel)
    {
        foreach (GameObject item in panels)
        {
            item.SetActive(item == panel);
        }
    }

    private void GamePausedCallback() => pausePanel.SetActive(true);
    private void GameResumedCallback() => pausePanel.SetActive(false);

    public void ShowRestartConfirmationPanel() => restartConfirmationPanel.SetActive(true);
    public void HideRestartConfirmationPanel() => restartConfirmationPanel.SetActive(false);

    public void ShowCharacterSelectionPanel() => characterSelectionPanel.SetActive(true);
    public void HideCharacterSelectionPanel() => characterSelectionPanel.SetActive(false);

    public void ShowSettingsPanel() => settingsPanel.SetActive(true);
    public void HideSettingPanel() => settingsPanel.SetActive(false);
}
```

## File: Managers/WaveManager.cs/WaveManager.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using NaughtyAttributes;
using UnityEngine;

public class WaveManager : MonoBehaviour, IGameStateListener
{
    [SerializeField] private Player player;
    [SerializeField] private int waveDuration;
    [SerializeField] private Wave[] waves;

    private float timer;
    private bool isTimerOn;
    private int currentWaveIndex;
    private List<float> localCounters = new List<float>();

    private WaveManagerUI waveManagerUI;

    private void Awake()
    {
        waveManagerUI = GetComponent<WaveManagerUI>();
    }

    private void Update()
    {
        if (!isTimerOn) return;

        if (timer < waveDuration)
        {
            ManageCurrentWave();
        }
        else
        {
            StartWaveTransition();
        }

        waveManagerUI.UpdateTextTimer(Mathf.RoundToInt(waveDuration - timer).ToString());
    }

    private void StartNextWave()
    {
        StartWave(currentWaveIndex);
    }

    private void StartWaveTransition()
    {
        isTimerOn = false;
        DefeatAllEnemy();
        currentWaveIndex++;
        if (currentWaveIndex >= waves.Length)
        {
            GameHandler.Instance.SetGameState(GameState.STAGECOMPLETE);
        }
        else
        {
            GameHandler.Instance.WaveCompleteCallBack();
        }

    }

    private void DefeatAllEnemy()
    {
        foreach (Enemy enemy in transform.GetComponentsInChildren<Enemy>())
        {
            enemy.PassAway();
        }
    }

    private void StartWave(int waveIndex)
    {
        waveManagerUI.UpdateTextWave("Wave " + (currentWaveIndex + 1));
        localCounters.Clear();
        foreach (WaveSegment segment in waves[waveIndex].segments)
        {
            localCounters.Add(1);
        }

        timer = 0;
        isTimerOn = true;
    }

    private void ManageCurrentWave()
    {
        Wave currentWave = waves[currentWaveIndex];

        for (int i = 0; i < currentWave.segments.Count; i++)
        {
            WaveSegment segment = currentWave.segments[i];

            float tStart = segment.tStartEnd.x / 100 * waveDuration;
            float tEnd = segment.tStartEnd.y / 100 * waveDuration;

            if (timer < tStart || timer > tEnd) continue;

            float timeSinceSegmentStart = timer - tStart;
            float spawnDeplay = 1f / segment.spawnFrequency;

            if (timeSinceSegmentStart / spawnDeplay > localCounters[i])
            {
                Instantiate(segment.prefabs, GetSpawnPosition(), Quaternion.identity, transform);
                localCounters[i]++;
            }
        }

        timer += Time.deltaTime;
    }

    private Vector2 GetSpawnPosition()
    {
        Vector2 direction = Random.onUnitSphere;
        Vector2 offset = direction.normalized * Random.Range(6, 10);
        Vector2 targetPos = (Vector2)player.transform.position + offset;

        if (!GameHandler.Instance.UseInfiniteMap)
        {
            targetPos.x = Mathf.Clamp(targetPos.x, -18, 18);
            targetPos.y = Mathf.Clamp(targetPos.y, -8, 8);
        }

        return targetPos;
    }

    public void GameStateChangeCallback(GameState gameState)
    {
        switch (gameState)
        {
            case GameState.GAME:
                StartNextWave();
                break;
            case GameState.GAMEOVER:
                isTimerOn = false;
                DefeatAllEnemy();
                break;

        }
    }
}

[System.Serializable]
public struct Wave
{
    public string name;
    public List<WaveSegment> segments;
}

[System.Serializable]
public struct WaveSegment
{
    [MinMaxSlider(0, 100)] public Vector2 tStartEnd;
    public float spawnFrequency;
    public GameObject prefabs;
}
```

## File: Managers/WaveTransitionManager.cs/WaveTransitionManager.cs
```csharp
using System;
using UnityEngine;


using Random = UnityEngine.Random;

public class WaveTransitionManager : MonoBehaviour, IGameStateListener
{
    [SerializeField] private UpgradeContainer[] upgradeContainers;
    [SerializeField] private Transform upgradeContainerParent;
    [SerializeField] private PlayerStatsManager playerStatsManager;

    [SerializeField] private ChestObjecContainer chestContainerPrefab;
    [SerializeField] private Transform chestContainerParent;
    [SerializeField] private PlayerObjects playerObjects;

    private int chestCollected;

    public static WaveTransitionManager Instance;

    private void Awake()
    {
        Chest.onCollected += ChestCollectedCallback;

        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
        }
    }

    private void OnDestroy()
    {
        Chest.onCollected -= ChestCollectedCallback;
    }

    public void GameStateChangeCallback(GameState gameState)
    {
        switch (gameState)
        {
            case GameState.WAVETRANSITION:
                TryOpenChest();
                break;
        }
    }

    private void TryOpenChest()
    {
        chestContainerParent.Clear();
        if (chestCollected > 0)
        {
            ShowObject();
        }
        else
        {
            ConfigureUpgradeContainers();
        }
    }

    private void ShowObject()
    {
        chestCollected--;

        upgradeContainerParent.gameObject.SetActive(false);
        chestContainerParent.gameObject.SetActive(true);

        ObjectDataSO[] objectDatas = ResourcesManager.Objects;
        ObjectDataSO randomObjectData = objectDatas[Random.Range(0, objectDatas.Length)];

        ChestObjecContainer containerInstance = Instantiate(chestContainerPrefab, chestContainerParent);
        containerInstance.Configure(randomObjectData);

        containerInstance.TakeButton.onClick.AddListener(() => TakeButtonCallback(randomObjectData));
        containerInstance.RecycleButton.onClick.AddListener(() => RecycleButtonCallBack(randomObjectData));
    }

    private void TakeButtonCallback(ObjectDataSO objectData)
    {
        playerObjects.AddObject(objectData);
        TryOpenChest();
    }

    private void RecycleButtonCallBack(ObjectDataSO objectData)
    {
        CurrencyManager.Instance.AddCurrency(objectData.RecyclePrice);
        TryOpenChest();
    }

    private void ConfigureUpgradeContainers()
    {
        upgradeContainerParent.gameObject.SetActive(true);
        chestContainerParent.gameObject.SetActive(false);

        for (int i = 0; i < upgradeContainers.Length; i++)
        {
            string randomStatString = "";
            int randomIndex = Random.Range(0, Enum.GetValues(typeof(Stat)).Length);
            Stat stat = (Stat)Enum.GetValues(typeof(Stat)).GetValue(randomIndex);

            randomStatString = Enums.FormatStatName(stat);

            string buttonString;
            Action action = GetActionToPerform(stat, out buttonString);

            Sprite spr = ResourcesManager.GetStatIcon(stat);

            upgradeContainers[i].Configure(spr, randomStatString, buttonString);
            upgradeContainers[i].Button.onClick.RemoveAllListeners();
            upgradeContainers[i].Button.onClick.AddListener(() =>
            {
                action?.Invoke();
                BonusSelectedCallBack();
            });
        }
    }

    private void BonusSelectedCallBack()
    {
        GameHandler.Instance.WaveCompleteCallBack();
    }

    private Action GetActionToPerform(Stat stat, out string buttonString)
    {
        buttonString = "";
        float value;

        switch (stat)
        {
            case Stat.Attack:
                value = 10;
                buttonString = "+" + value + "%";
                break;
            case Stat.AttackSpeed:
                value = 10;
                buttonString = "+" + value + "%";
                break;
            case Stat.CriticalChance:
                value = 10;
                buttonString = "+" + value + "%";
                break;
            case Stat.CriticalPercent:
                value = 0.1f;
                buttonString = "+" + value + "x";
                break;
            case Stat.MoveSpeed:
                value = 10;
                buttonString = "+" + value + "%";
                break;
            case Stat.MaxHealth:
                value = 10;
                buttonString = "+" + value;
                break;
            case Stat.Range:
                value = 10;
                buttonString = "+" + value;
                break;
            case Stat.HealthRecoverySpeed:
                value = 10;
                buttonString = "+" + value + "%";
                break;
            case Stat.Armor:
                value = 10;
                buttonString = "+" + value + "%";
                break;
            case Stat.Luck:
                value = 10;
                buttonString = "+" + value + "%";
                break;
            case Stat.Dodge:
                value = 10;
                buttonString = "+" + value + "%";
                break;
            case Stat.LifeSteal:
                value = 10;
                buttonString = "+" + value + "%";
                break;

            default:
                return () => Debug.Log("Invalid stat");

        }

        return () => playerStatsManager.AddPlayerStat(stat, value);
    }

    private void ChestCollectedCallback(Chest chest)
    {
        chestCollected++;
    }

    public bool HasChestCollected()
    {
        return chestCollected > 0;
    }
}
```

## File: Managers/WeaponMerger.cs/WeaponMerger.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WeaponMerger : MonoBehaviour
{
    [SerializeField] private PlayerWeapons playerWeapons;

    private List<Weapon> weaponsToMerge = new List<Weapon>();

    public static WeaponMerger Instance;
    public static Action<Weapon> onMerge;

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
        }
    }

    public bool CanMerge(Weapon weapon)
    {
        if (weapon.Level >= 4) return false;

        weaponsToMerge.Clear();
        weaponsToMerge.Add(weapon);
        Weapon[] weapons = playerWeapons.GetWeapons();

        foreach (Weapon playerWeapon in weapons)
        {
            if (playerWeapon == null) continue;
            if (playerWeapon == weapon) continue;
            if (playerWeapon.WeaponData.Name != weapon.WeaponData.Name) continue;
            if (playerWeapon.Level != weapon.Level) continue;

            weaponsToMerge.Add(playerWeapon);
            return true;
        }

        return false;
    }

    public void Merge()
    {
        if (weaponsToMerge.Count < 2) return;

        DestroyImmediate(weaponsToMerge[1].gameObject);

        weaponsToMerge[0].Upgrade();

        Weapon weapon = weaponsToMerge[0];
        weaponsToMerge.Clear();

        onMerge?.Invoke(weapon);
    }
}
```

## File: Managers/WeaponSelectionManager.cs/WeaponSelectionManager.cs
```csharp
using UnityEngine;
using Random = UnityEngine.Random;

public class WeaponSelectionManager : MonoBehaviour, IGameStateListener
{
    [SerializeField] private Transform containerParent;
    [SerializeField] private WeaponSelectionContainer weaponSelectionPrefab;
    [SerializeField] private WeaponDataSO[] starterWeapons;
    [SerializeField] private PlayerWeapons playerWeapons;

    private WeaponDataSO selectedWeapon;
    private int initialWeaponLevel;

    public void GameStateChangeCallback(GameState gameState)
    {
        switch (gameState)
        {
            case GameState.GAME:

                if (selectedWeapon == null) return;
                playerWeapons.TryAddWeapon(selectedWeapon, initialWeaponLevel);
                selectedWeapon = null;
                initialWeaponLevel = 0;
                break;

            case GameState.WEAPONSELECTION:
                Configure();
                break;
        }
    }

    [NaughtyAttributes.Button]
    private void Configure()
    {
        containerParent.Clear();

        for (int i = 0; i < 3; i++)
        {
            GenerateWeaponContainer();
        }
    }

    private void GenerateWeaponContainer()
    {
        WeaponSelectionContainer containerInstance = Instantiate(weaponSelectionPrefab, containerParent);
        WeaponDataSO weaponData = starterWeapons[Random.Range(0, starterWeapons.Length)];

        int level = Random.Range(0, 5);


        containerInstance.Configure(weaponData, level);
        containerInstance.Button.onClick.RemoveAllListeners();
        containerInstance.Button.onClick.AddListener(() => WeaponSelectedCallBack(containerInstance, weaponData, level));
    }

    private void WeaponSelectedCallBack(WeaponSelectionContainer containerIns, WeaponDataSO weaponData, int level)
    {
        selectedWeapon = weaponData;
        initialWeaponLevel = level;
        foreach (WeaponSelectionContainer container in containerParent.GetComponentsInChildren<WeaponSelectionContainer>())
        {
            if (container == containerIns)
            {
                container.Select();
            }
            else
            {
                container.Deselect();
            }
        }
    }
}
```

## File: Player/Player.cs/Player.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    [SerializeField] private SpriteRenderer playerRenderer;

    private PlayerHealth playerHealth;
    private PlayerLevel playerLevel;
    private Collider2D col2D;

    public static Player Instance;

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
        }

        playerHealth = GetComponent<PlayerHealth>();
        playerLevel = GetComponent<PlayerLevel>();
        col2D = GetComponent<Collider2D>();

        CharacterSelectionManager.onCharacterSelected += CharacterSelectedCallback;
    }

    private void OnDestroy()
    {
        CharacterSelectionManager.onCharacterSelected -= CharacterSelectedCallback;
    }

    public void TakeDamage(int damage) => playerHealth.TakeDamage(damage);

    public Vector3 GetCenter()
    {
        return (Vector2)transform.position + col2D.offset;
    }

    public bool HasLevelUp() => playerLevel.HasLevelUp();

    private void CharacterSelectedCallback(CharacterDataSO data)
    {
        playerRenderer.sprite = data.Sprite;
    }

}
```

## File: Player/PlayerAnimator.cs/PlayerAnimator.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerAnimator : MonoBehaviour
{
    private Animator animator;
    private Rigidbody2D rb;

    private void Awake()
    {
        animator = GetComponent<Animator>();
        rb = GetComponent<Rigidbody2D>();
    }

    private void FixedUpdate()
    {
        if (rb.linearVelocity.magnitude < 0.001f)
        {
            animator.Play("Idle");
        }
        else
        {
            animator.Play("Move");
        }
    }
}
```

## File: Player/PlayerController.cs/PlayerController.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour, IPlayerStatsDepnedency
{
    [Header("Elements")]
    [SerializeField] private MobileJoystick joystick;
    [Header("Settings")]
    [SerializeField] private float baseMoveSpeed = .1f;
    private float moveSpeed = .1f;
    private Rigidbody2D rb;

    private void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    private void FixedUpdate()
    {
        rb.linearVelocity = joystick.GetMoveVector() * moveSpeed * Time.deltaTime;
    }

    public void UpdateStats(PlayerStatsManager playerStatsManager)
    {
        float moveSpeedPercent = playerStatsManager.GetStatValue(Stat.MoveSpeed) / 100;
        moveSpeed = baseMoveSpeed * (1 + moveSpeedPercent);
    }
}
```

## File: Player/PlayerDetection.cs/PlayerDetection.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerDetection : MonoBehaviour
{
    [SerializeField] private CircleCollider2D collectableCollider;

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.TryGetComponent<ICollectable>(out ICollectable candy))
        {
            if (!other.IsTouching(collectableCollider)) return;
            candy.Collect(GetComponent<Player>());
        }
    }
}
```

## File: Player/PlayerHealth.cs/PlayerHealth.cs
```csharp
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System;

using Random = UnityEngine.Random;

public class PlayerHealth : MonoBehaviour, IPlayerStatsDepnedency
{
    [SerializeField] private int baseMaxHealth;
    [SerializeField] private Slider slider;
    [SerializeField] private TextMeshProUGUI txtHealth;

    private float health;
    private int maxHealth;
    private float armor;
    private float lifeSteal;
    private float dodge;
    private float healthRecoveryValue = .1f;
    private float healthRecoverySpeed;
    private float healthRecoveryTimer;
    private float healthRecoveryDuration;

    public static Action<Vector2> onAttackDodged;

    private void Awake()
    {
        Enemy.onDamageTaken += EnemyTookDamageCallback;
    }

    private void OnDestroy()
    {
        Enemy.onDamageTaken -= EnemyTookDamageCallback;
    }

    private void EnemyTookDamageCallback(int damage, Vector2 enemyPos, bool isHitCritical)
    {
        if (health >= maxHealth) return;

        float lifeStealValue = damage * lifeSteal;
        float healthToAdd = Math.Min(lifeStealValue, maxHealth - health);

        health += healthToAdd;
        UpdateUI();
    }

    private void Start()
    {

    }

    private void Update()
    {
        if (health >= maxHealth) return;
        RecoverHealth();
    }

    private void RecoverHealth()
    {
        healthRecoveryTimer += Time.deltaTime;

        if (healthRecoveryTimer >= healthRecoveryDuration)
        {
            healthRecoveryTimer = 0;

            float healthToAdd = Mathf.Min(healthRecoveryValue, maxHealth - health);
            health += healthToAdd;

            UpdateUI();
        }
    }

    private void UpdateUI()
    {
        slider.value = health / maxHealth;
        txtHealth.text = $"{(int)health} / {maxHealth}";
    }

    public void TakeDamage(int damage)
    {
        if (ShouldDodge())
        {
            onAttackDodged?.Invoke(transform.position);
            return;
        }


        float realDamage = damage * Mathf.Clamp(1 - (armor / 1000), 0, 1000);
        realDamage = Mathf.Min(realDamage, health);
        health -= realDamage;

        UpdateUI();

        if (health <= 0)
        {
            PassAway();
        }

    }

    private bool ShouldDodge()
    {
        return Random.Range(0f, 100f) < dodge;
    }

    private void PassAway()
    {
        GameHandler.Instance.SetGameState(GameState.GAMEOVER);
    }

    public void UpdateStats(PlayerStatsManager playerStatsManager)
    {
        float addedHealth = playerStatsManager.GetStatValue(Stat.MaxHealth);
        maxHealth = baseMaxHealth + (int)addedHealth;
        maxHealth = Mathf.Max(maxHealth, 1);
        health = maxHealth;
        UpdateUI();

        armor = playerStatsManager.GetStatValue(Stat.Armor);
        lifeSteal = playerStatsManager.GetStatValue(Stat.LifeSteal) / 100;
        dodge = playerStatsManager.GetStatValue(Stat.Dodge);

        healthRecoverySpeed = Math.Max(0.0001f, playerStatsManager.GetStatValue(Stat.HealthRecoverySpeed));
        healthRecoveryDuration = 1f / healthRecoverySpeed;
    }
}
```

## File: Player/PlayerLevel.cs/PlayerLevel.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class PlayerLevel : MonoBehaviour
{
    [SerializeField] private Slider xpBar;
    [SerializeField] private TextMeshProUGUI txtLevel;

    private int requiredXP;
    private int currentXP;
    private int level;
    private int levelIsEarnedThisWave;

    private void Awake()
    {
        Candy.onCollected += GainExp;
    }

    private void OnDestroy()
    {
        Candy.onCollected -= GainExp;
    }
    private void Start()
    {
        UpdateRequiredXP();
        UpdateVisual();
    }

    private void UpdateVisual()
    {
        xpBar.value = (float)currentXP / requiredXP;
        txtLevel.text = "lvl " + (level + 1);
    }

    private void UpdateRequiredXP()
    {
        requiredXP = (level + 1) * 5;
    }

    private void GainExp(Candy candy)
    {
        currentXP++;

        if (currentXP >= requiredXP)
        {
            LevelUp();
        }

        UpdateVisual();
    }

    private void LevelUp()
    {
        currentXP = 0;
        level++;
        levelIsEarnedThisWave++;
        UpdateRequiredXP();
    }

    public bool HasLevelUp()
    {
        if (levelIsEarnedThisWave > 0)
        {
            levelIsEarnedThisWave--;
            return true;
        }
        return false;
    }
}
```

## File: Player/PlayerObjects.cs/PlayerObjects.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerObjects : MonoBehaviour
{
    [field: SerializeField] public List<ObjectDataSO> Objects { get; private set; }

    private PlayerStatsManager playerStatsManager;

    private void Awake()
    {
        playerStatsManager = GetComponent<PlayerStatsManager>();
    }

    private void Start()
    {
        foreach (ObjectDataSO objectData in Objects)
        {
            playerStatsManager.AddObject(objectData.BaseStat);
        }
    }

    public void AddObject(ObjectDataSO objectData)
    {
        Objects.Add(objectData);
        playerStatsManager.AddObject(objectData.BaseStat);
    }

    public void RecycleObject(ObjectDataSO objectData)
    {
        Objects.Remove(objectData);
        CurrencyManager.Instance.AddCurrency(objectData.RecyclePrice);
        playerStatsManager.RemoveObjectStat(objectData.BaseStat);
    }
}
```

## File: Player/PlayerWeapons.cs/PlayerWeapons.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

public class PlayerWeapons : MonoBehaviour
{
    [SerializeField] private WeaponPosition[] weaponPositions;
    [SerializeField] private Transform weaponParent;

    public bool TryAddWeapon(WeaponDataSO weaponData, int level)
    {
        for (int i = 0; i < weaponPositions.Length; i++)
        {
            if (weaponPositions[i].Weapon != null) continue;
            weaponPositions[i].AssignWeapon(weaponData.Prefab, level);
            return true;
        }

        return false;
    }

    public Weapon[] GetWeapons()
    {
        List<Weapon> weapons = new List<Weapon>();

        foreach (WeaponPosition weaponPosition in weaponPositions)
        {
            if (weaponPosition.Weapon == null)
                weapons.Add(null);
            else
                weapons.Add(weaponPosition.Weapon);
        }

        return weapons.ToArray();
    }

    public void RecycleWeapon(int index)
    {
        for (int i = 0; i < weaponPositions.Length; i++)
        {
            if (i != index) continue;

            int recyclePrice = weaponPositions[i].Weapon.GetRecyclePrice();
            CurrencyManager.Instance.AddCurrency(recyclePrice);
            weaponPositions[i].RemoveWeapon();
            return;
        }
    }
}
```

## File: ScriptableObjects/CharacterDataSO.cs/CharacterDataSO.cs
```csharp
using System.Collections.Generic;
using NaughtyAttributes;
using UnityEngine;

[CreateAssetMenu(fileName = "CharacterData", menuName = "DemonSlayer/CharacterDataSO", order = 0)]
public class CharacterDataSO : ScriptableObject
{
    [field: SerializeField] public string Name { get; private set; }
    [field: SerializeField] public Sprite Sprite { get; private set; }
    [field: SerializeField] public int PurchasePrice { get; private set; }


    [Space(10)]
    [HorizontalLine]
    [SerializeField] private float attack;
    [SerializeField] private float attackSpeed;
    [SerializeField] private float criticalChance;
    [SerializeField] private float criticalPercent;
    [SerializeField] private float moveSpeed;
    [SerializeField] private float maxHealth;
    [SerializeField] private float range;
    [SerializeField] private float healthRecoverySpeed;
    [SerializeField] private float armor;
    [SerializeField] private float luck;
    [SerializeField] private float dodge;
    [SerializeField] private float lifeSteal;

    public Dictionary<Stat, float> BaseStat
    {
        get
        {
            return new Dictionary<Stat, float>
            {
                {Stat.Attack, attack},
                {Stat.AttackSpeed, attackSpeed},
                {Stat.CriticalChance, criticalChance},
                {Stat.CriticalPercent, criticalPercent},
                {Stat.MoveSpeed, moveSpeed},
                {Stat.MaxHealth, maxHealth},
                {Stat.Range, range},
                {Stat.HealthRecoverySpeed, healthRecoverySpeed},
                {Stat.Armor, armor},
                {Stat.Luck, luck},
                {Stat.Dodge, dodge},
                {Stat.LifeSteal, lifeSteal},

            };
        }
        private set { }
    }

    public Dictionary<Stat, float> NonNeutralStats
    {
        get
        {
            Dictionary<Stat, float> nonNeutralStats = new Dictionary<Stat, float>();

            foreach (KeyValuePair<Stat, float> kvp in BaseStat)
            {
                if (kvp.Value != 0)
                {
                    nonNeutralStats.Add(kvp.Key, kvp.Value);
                }
            }

            return nonNeutralStats;
        }
        private set { }
    }

}
```

## File: ScriptableObjects/ObjectDataSO.cs/ObjectDataSO.cs
```csharp
using System.Collections.Generic;
using NaughtyAttributes;
using UnityEngine;

[CreateAssetMenu(fileName = "ObjectData", menuName = "DemonSlayer/ObjectDataSO", order = 4)]
public class ObjectDataSO : ScriptableObject
{
    [field: SerializeField] public string Name { get; private set; }
    [field: SerializeField] public Sprite Sprite { get; private set; }
    [field: SerializeField] public int Price { get; private set; }
    [field: SerializeField] public int RecyclePrice { get; private set; }
    [field: Range(0, 3)]
    [field: SerializeField] public int Rarity { get; private set; }
    [SerializeField] private StatData[] statDatas;


    public Dictionary<Stat, float> BaseStat
    {
        get
        {
            Dictionary<Stat, float> stats = new Dictionary<Stat, float>();
            foreach (StatData data in statDatas)
            {
                stats.Add(data.stat, data.value);
            }

            return stats;
        }
        private set { }
    }
}

[System.Serializable]
public struct StatData
{
    public Stat stat;
    public float value;
}
```

## File: ScriptableObjects/PaletteSO.cs/PaletteSO.cs
```csharp
using UnityEngine;

[CreateAssetMenu(fileName = "PaletteSO", menuName = "DemonSlayer/PaletteSO", order = 2)]
public class PaletteSO : ScriptableObject
{
    [field: SerializeField] public Color[] LevelColors { get; private set; }
    [field: SerializeField] public Color[] LevelOutLineColors { get; private set; }
}
```

## File: ScriptableObjects/StatIconDataSO.cs/StatIconDataSO.cs
```csharp
using UnityEngine;

[CreateAssetMenu(fileName = "StatIconData", menuName = "DemonSlayer/StatIconDataSO", order = 3)]
public class StatIconDataSO : ScriptableObject
{
    [field: SerializeField] public StatIcon[] StatIcons { get; private set; }
}

[System.Serializable]
public struct StatIcon
{
    public Stat stat;
    public Sprite sprite;
}
```

## File: ScriptableObjects/WeaponDataSO.cs/WeaponDataSO.cs
```csharp
using System;
using System.Collections.Generic;
using NaughtyAttributes;
using UnityEngine;

[CreateAssetMenu(fileName = "WeaponData", menuName = "DemonSlayer/WeaponDataSO", order = 1)]
public class WeaponDataSO : ScriptableObject
{
    [field: SerializeField] public string Name { get; private set; }
    [field: SerializeField] public Sprite Sprite { get; private set; }
    [field: SerializeField] public int PurchasePrice { get; private set; }
    [field: SerializeField] public int RecyclePrice { get; private set; }
    [field: SerializeField] public AudioClip AttackSound { get; private set; }
    [field: SerializeField] public Weapon Prefab { get; private set; }

    [Space(10)]
    [HorizontalLine]
    [SerializeField] private float attack;
    [SerializeField] private float attackSpeed;
    [SerializeField] private float criticalChance;
    [SerializeField] private float criticalPercent;
    [SerializeField] private float range;

    public Dictionary<Stat, float> BaseStat
    {
        get
        {
            return new Dictionary<Stat, float>
            {
                {Stat.Attack, attack},
                {Stat.AttackSpeed, attackSpeed},
                {Stat.CriticalChance, criticalChance},
                {Stat.CriticalPercent, criticalPercent},
                {Stat.Range, range},
            };
        }
        private set { }
    }

    public float GetStatValue(Stat stat)
    {
        foreach (KeyValuePair<Stat, float> kvp in BaseStat)
        {
            if (kvp.Key == stat)
                return kvp.Value;
        }

        return 0;
    }
}
```

## File: Weapons/Bullet.cs/Bullet.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Bullet : MonoBehaviour
{
    [SerializeField] private float moveSpeed = 5f;
    [SerializeField] private LayerMask enemyLayerMark;

    private int damage;
    private Rigidbody2D rb;
    private Collider2D col2D;
    private RangeWeapon rangeWeapon;

    private Enemy target;
    private bool isCriticalHit;

    private void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
        col2D = GetComponent<Collider2D>();
    }

    public void ShootBullet(int damage, Vector2 dir, bool isCriticalHit)
    {
        Invoke(nameof(Release), 5);
        this.damage = damage;
        this.isCriticalHit = isCriticalHit;
        transform.right = dir;
        rb.linearVelocity += dir * moveSpeed;
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (target != null) return;

        if (IsInLayerMask(other.gameObject.layer, enemyLayerMark))
        {

            target = other.GetComponent<Enemy>();
            CancelInvoke();
            other.GetComponent<Enemy>().TakeDamage(damage, isCriticalHit);
            // col2D.enabled = false;
            Release();
        }
    }

    private bool IsInLayerMask(int layer, LayerMask enemyLayerMark)
    {
        return (enemyLayerMark.value & (1 << layer)) != 0;
    }

    public void Configure(RangeWeapon rangeWeapon)
    {
        this.rangeWeapon = rangeWeapon;
    }

    public void Reload()
    {
        target = null;
        rb.linearVelocity = Vector2.zero;
        col2D.enabled = true;
    }

    private void Release()
    {
        if (!gameObject.activeSelf) return;
        rangeWeapon.ReleaseBullet(this);
    }
}
```

## File: Weapons/MeleeWeapon.cs/MeleeWeapon.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MeleeWeapon : Weapon
{
    [SerializeField] private Transform hitDetectTransform;

    private BoxCollider2D boxCollider2D;
    private List<Enemy> damagedEnemy = new List<Enemy>();

    private enum State
    {
        Idle,
        Attack
    }

    private State state;


    protected override void Awake()
    {
        base.Awake();
        anim = GetComponent<Animator>();
        boxCollider2D = hitDetectTransform.GetComponent<BoxCollider2D>();

    }

    private void Start()
    {
        state = State.Idle;
    }

    private void Update()
    {
        switch (state)
        {
            case State.Idle:
                RotateWeapon();
                break;

            case State.Attack:
                Attack();
                break;
        }

    }

    [NaughtyAttributes.Button]
    private void StartAttack()
    {
        anim.Play("Attack");
        state = State.Attack;
        damagedEnemy.Clear();

        anim.speed = 1f / attackDelay;

        if (!AudioManager.Instance.IsSFXOn) return;
        PlayAttackSound();
    }

    private void StopAttack()
    {
        damagedEnemy.Clear();
        state = State.Idle;
    }

    private void Attack()
    {
        Collider2D[] enemies = Physics2D.OverlapBoxAll(hitDetectTransform.position, boxCollider2D.bounds.size, hitDetectTransform.localEulerAngles.z, layerMaskEnemy);
        for (int i = 0; i < enemies.Length; i++)
        {
            Enemy enemy = enemies[i].GetComponent<Enemy>();
            if (!damagedEnemy.Contains(enemy))
            {
                int damage = GetDamage(out bool isCriticalHit);
                enemy.TakeDamage(damage, isCriticalHit);
                damagedEnemy.Add(enemy);
            }
        }
    }

    private void RotateWeapon()
    {
        Enemy closestEnemy = GetClosestEnemy();
        Vector2 targetUpVector = Vector3.up;

        if (closestEnemy != null)
        {
            ManageAttack();
            targetUpVector = (closestEnemy.transform.position - transform.position).normalized;
            transform.up = targetUpVector;
        }

        transform.up = Vector3.Lerp(transform.up, targetUpVector, Time.deltaTime * animLerp);
        IncrementAttackTimer();

    }

    private void ManageAttack()
    {
        if (attackTimer >= attackDelay)
        {
            attackTimer = 0;
            StartAttack();
        }
    }

    private void IncrementAttackTimer()
    {
        attackTimer += Time.deltaTime;
    }

    public override void UpdateStats(PlayerStatsManager playerStatsManager)
    {
        ConfigureStats();
        damage = Mathf.RoundToInt(damage * (1 + playerStatsManager.GetStatValue(Stat.Attack) / 100));

        attackDelay /= 1 + (playerStatsManager.GetStatValue(Stat.AttackSpeed) / 100);
        criticalChance = Mathf.RoundToInt(criticalChance * (1 + playerStatsManager.GetStatValue(Stat.CriticalChance) / 100));
        criticalPercent += playerStatsManager.GetStatValue(Stat.CriticalPercent);
        range += playerStatsManager.GetStatValue(Stat.Range) / 10;
    }
}
```

## File: Weapons/RangeWeapon.cs/RangeWeapon.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Pool;

public class RangeWeapon : Weapon
{
    [SerializeField] private Bullet bulletPrefabs;
    [SerializeField] private Transform shootingPoint;

    private ObjectPool<Bullet> bulletPool;
    public static Action onBulletShoot;

    private void Start()
    {
        bulletPool = new ObjectPool<Bullet>(CreateFunction, ActionOnGet, ActionOnRelease, ActionOnDestroy);
    }

    private Bullet CreateFunction()
    {
        Bullet bulletInstance = Instantiate(bulletPrefabs, shootingPoint.position, Quaternion.identity);
        bulletInstance.Configure(this);
        return bulletInstance;
    }

    private void ActionOnGet(Bullet bullet)
    {
        bullet.Reload();
        bullet.transform.position = shootingPoint.position;
        bullet.gameObject.SetActive(true);
    }

    private void ActionOnRelease(Bullet bullet)
    {
        bullet.gameObject.SetActive(false);
    }

    private void ActionOnDestroy(Bullet bullet)
    {
        Destroy(bullet.gameObject);
    }

    private void Update()
    {
        RotateWeapon();
    }

    private void RotateWeapon()
    {
        Enemy closestEnemy = GetClosestEnemy();
        Vector2 targetUpVector = Vector3.right;
        Vector3 scale = Vector3.one;

        if (closestEnemy != null)
        {
            scale = closestEnemy.transform.position.x > transform.position.x ? Vector3.one : Vector3.one.With(y: -1);
            targetUpVector = (closestEnemy.transform.position - transform.position).normalized;
            transform.right = targetUpVector;

            ManageShooting();
        }

        transform.localScale = scale;
        transform.right = Vector3.Lerp(transform.right, targetUpVector, Time.deltaTime * animLerp);
    }

    private void ManageShooting()
    {
        attackTimer += Time.deltaTime;
        if (attackTimer >= attackDelay)
        {
            attackTimer = 0;
            Shooting();
        }
    }

    private void Shooting()
    {
        Bullet bullet = bulletPool.Get();
        int damage = GetDamage(out bool isCriticalHit);
        bullet.ShootBullet(damage, transform.right, isCriticalHit);

        if (!AudioManager.Instance.IsSFXOn) return;
        PlayAttackSound();
        onBulletShoot?.Invoke();
    }

    public void ReleaseBullet(Bullet bullet)
    {
        bulletPool.Release(bullet);
    }

    public override void UpdateStats(PlayerStatsManager playerStatsManager)
    {
        ConfigureStats();
        damage = Mathf.RoundToInt(damage * (1 + playerStatsManager.GetStatValue(Stat.Attack) / 100));

        attackDelay /= 1 + (playerStatsManager.GetStatValue(Stat.AttackSpeed) / 100);
        criticalChance = Mathf.RoundToInt(criticalChance * (1 + playerStatsManager.GetStatValue(Stat.CriticalChance) / 100));
        criticalPercent += playerStatsManager.GetStatValue(Stat.CriticalPercent);
        range += playerStatsManager.GetStatValue(Stat.Range) / 10;
    }


}
```

## File: Weapons/Weapon.cs/Weapon.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public abstract class Weapon : MonoBehaviour, IPlayerStatsDepnedency
{
    [field: SerializeField] public WeaponDataSO WeaponData { get; private set; }
    [field: SerializeField] public int Level { get; private set; }

    [SerializeField] protected float range = 3f;
    [SerializeField] protected float animLerp = 12f;
    [SerializeField] protected LayerMask layerMaskEnemy;
    [SerializeField] protected float attackDelay;

    protected Animator anim;
    protected int damage = 1;
    protected float attackTimer;
    protected int criticalChance;
    protected float criticalPercent;

    protected AudioSource audioSource;

    protected virtual void Awake()
    {
        audioSource = gameObject.AddComponent<AudioSource>();
        audioSource.playOnAwake = false;
        audioSource.clip = WeaponData.AttackSound;
    }

    protected void PlayAttackSound()
    {
        audioSource.pitch = Random.Range(.95f, 1.05f);
        audioSource.Play();
    }

    protected virtual Enemy GetClosestEnemy()
    {
        Enemy closestEnemy = null;
        Collider2D[] enemies = Physics2D.OverlapCircleAll(transform.position, range, layerMaskEnemy);
        if (enemies.Length <= 0) return null;

        float minDistance = range;
        for (int i = 0; i < enemies.Length; i++)
        {
            Enemy enemyCheck = enemies[i].GetComponent<Enemy>();
            float distanceToEnemy = Vector2.Distance(transform.position, enemyCheck.transform.position);
            if (distanceToEnemy < minDistance)
            {
                closestEnemy = enemyCheck;
                minDistance = distanceToEnemy;
            }
        }

        return closestEnemy;
    }

    protected virtual int GetDamage(out bool isCriticalHit)
    {
        isCriticalHit = false;

        if (Random.Range(0, 100) <= criticalChance)
        {
            // Debug.Log(criticalPercent);
            isCriticalHit = true;
            return Mathf.RoundToInt(damage * criticalPercent);
        }

        return damage;
    }

    protected virtual void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.magenta;
        Gizmos.DrawWireSphere(transform.position, range);
    }

    public abstract void UpdateStats(PlayerStatsManager playerStatsManager);

    protected virtual void ConfigureStats()
    {
        Dictionary<Stat, float> calculatedStat = WeaponStatsCalculator.GetStats(WeaponData, Level);

        damage = Mathf.RoundToInt(calculatedStat[Stat.Attack]);
        attackDelay = 1f / calculatedStat[Stat.AttackSpeed];

        criticalChance = Mathf.RoundToInt(calculatedStat[Stat.CriticalChance]);
        criticalPercent = calculatedStat[Stat.CriticalPercent];

        if (WeaponData.Prefab.GetType() == typeof(RangeWeapon))
            range = calculatedStat[Stat.Range];
    }

    public void UpgradeTo(int weaponLevel)
    {
        Level = weaponLevel;
        ConfigureStats();
    }

    public int GetRecyclePrice() => WeaponStatsCalculator.GetPurchasePrice(WeaponData, Level);

    public void Upgrade() => UpgradeTo(Level + 1);

}
```

## File: Weapons/WeaponPosition.cs/WeaponPosition.cs
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WeaponPosition : MonoBehaviour
{
    public Weapon Weapon { get; private set; }

    public void AssignWeapon(Weapon weapon, int weaponLevel)
    {
        Weapon = Instantiate(weapon, transform);
        Weapon.transform.localPosition = Vector3.zero;
        Weapon.transform.localRotation = Quaternion.identity;

        Weapon.UpgradeTo(weaponLevel);
    }

    public void RemoveWeapon()
    {
        Destroy(Weapon.gameObject);
        Weapon = null;
    }
}
```

## File: Weapons/WeaponStatsCalculator.cs/WeaponStatsCalculator.cs
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class WeaponStatsCalculator
{
    public static Dictionary<Stat, float> GetStats(WeaponDataSO weaponData, int level)
    {
        float multiplier = 1 + (float)level / 3;

        Dictionary<Stat, float> calculatedStats = new Dictionary<Stat, float>();

        foreach (KeyValuePair<Stat, float> kvp in weaponData.BaseStat)
        {
            if (weaponData.Prefab.GetType() != typeof(RangeWeapon) && kvp.Key == Stat.Range)
            {
                calculatedStats.Add(kvp.Key, kvp.Value);
            }
            else
            {
                calculatedStats.Add(kvp.Key, kvp.Value * multiplier);
            }
        }

        return calculatedStats;
    }

    public static int GetPurchasePrice(WeaponDataSO weaponDataSO, int level)
    {
        float multiplier = 1 + (float)level / 3;
        return (int)(weaponDataSO.PurchasePrice * multiplier);
    }

    public static int GetRecyclePrice(WeaponDataSO weaponDataSO, int level)
    {
        float multiplier = 1 + (float)level / 3;
        return (int)(weaponDataSO.RecyclePrice * multiplier);
    }
}
```
