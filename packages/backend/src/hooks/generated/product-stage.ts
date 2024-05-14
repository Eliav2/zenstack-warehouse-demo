/* eslint-disable */
import type { Prisma, ProductStage } from "@prisma/client";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateProductStage(options?: Omit<(UseMutationOptions<(ProductStage | undefined), DefaultError, Prisma.ProductStageCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ProductStageCreateArgs, DefaultError, ProductStage, true>('ProductStage', 'POST', `${endpoint}/productStage/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ProductStageCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.ProductStageCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, ProductStage, Prisma.ProductStageGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.ProductStageCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, ProductStage, Prisma.ProductStageGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyProductStage(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.ProductStageCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ProductStageCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('ProductStage', 'POST', `${endpoint}/productStage/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ProductStageCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.ProductStageCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.ProductStageCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyProductStage<TArgs extends Prisma.ProductStageFindManyArgs, TQueryFnData = Array<Prisma.ProductStageGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ProductStageFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ProductStage', `${endpoint}/productStage/findMany`, args, options, fetch);
}

export function useInfiniteFindManyProductStage<TArgs extends Prisma.ProductStageFindManyArgs, TQueryFnData = Array<Prisma.ProductStageGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ProductStageFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey'>) {
    options = options ?? { initialPageParam: undefined, getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('ProductStage', `${endpoint}/productStage/findMany`, args, options, fetch);
}

export function useSuspenseFindManyProductStage<TArgs extends Prisma.ProductStageFindManyArgs, TQueryFnData = Array<Prisma.ProductStageGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ProductStageFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ProductStage', `${endpoint}/productStage/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyProductStage<TArgs extends Prisma.ProductStageFindManyArgs, TQueryFnData = Array<Prisma.ProductStageGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ProductStageFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey'>) {
    options = options ?? { initialPageParam: undefined, getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('ProductStage', `${endpoint}/productStage/findMany`, args, options, fetch);
}

export function useFindUniqueProductStage<TArgs extends Prisma.ProductStageFindUniqueArgs, TQueryFnData = Prisma.ProductStageGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.ProductStageFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ProductStage', `${endpoint}/productStage/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniqueProductStage<TArgs extends Prisma.ProductStageFindUniqueArgs, TQueryFnData = Prisma.ProductStageGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.ProductStageFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ProductStage', `${endpoint}/productStage/findUnique`, args, options, fetch);
}

export function useFindFirstProductStage<TArgs extends Prisma.ProductStageFindFirstArgs, TQueryFnData = Prisma.ProductStageGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ProductStageFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ProductStage', `${endpoint}/productStage/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstProductStage<TArgs extends Prisma.ProductStageFindFirstArgs, TQueryFnData = Prisma.ProductStageGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ProductStageFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ProductStage', `${endpoint}/productStage/findFirst`, args, options, fetch);
}

export function useUpdateProductStage(options?: Omit<(UseMutationOptions<(ProductStage | undefined), DefaultError, Prisma.ProductStageUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ProductStageUpdateArgs, DefaultError, ProductStage, true>('ProductStage', 'PUT', `${endpoint}/productStage/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ProductStageUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.ProductStageUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, ProductStage, Prisma.ProductStageGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.ProductStageUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, ProductStage, Prisma.ProductStageGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyProductStage(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.ProductStageUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ProductStageUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('ProductStage', 'PUT', `${endpoint}/productStage/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ProductStageUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.ProductStageUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.ProductStageUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertProductStage(options?: Omit<(UseMutationOptions<(ProductStage | undefined), DefaultError, Prisma.ProductStageUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ProductStageUpsertArgs, DefaultError, ProductStage, true>('ProductStage', 'POST', `${endpoint}/productStage/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ProductStageUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.ProductStageUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, ProductStage, Prisma.ProductStageGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.ProductStageUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, ProductStage, Prisma.ProductStageGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteProductStage(options?: Omit<(UseMutationOptions<(ProductStage | undefined), DefaultError, Prisma.ProductStageDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ProductStageDeleteArgs, DefaultError, ProductStage, true>('ProductStage', 'DELETE', `${endpoint}/productStage/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ProductStageDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.ProductStageDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, ProductStage, Prisma.ProductStageGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.ProductStageDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, ProductStage, Prisma.ProductStageGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyProductStage(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.ProductStageDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ProductStageDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('ProductStage', 'DELETE', `${endpoint}/productStage/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ProductStageDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.ProductStageDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.ProductStageDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateProductStage<TArgs extends Prisma.ProductStageAggregateArgs, TQueryFnData = Prisma.GetProductStageAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.ProductStageAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ProductStage', `${endpoint}/productStage/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateProductStage<TArgs extends Prisma.ProductStageAggregateArgs, TQueryFnData = Prisma.GetProductStageAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.ProductStageAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ProductStage', `${endpoint}/productStage/aggregate`, args, options, fetch);
}

export function useGroupByProductStage<TArgs extends Prisma.ProductStageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.ProductStageGroupByArgs['orderBy'] } : { orderBy?: Prisma.ProductStageGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
        ? never
        : P extends string
        ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
        : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`,
        ]
    }[HavingFields]
    : 'take' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields], TQueryFnData = {} extends InputErrors ?
    Array<PickEnumerable<Prisma.ProductStageGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.ProductStageGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.ProductStageGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.ProductStageGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.ProductStageGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ProductStage', `${endpoint}/productStage/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByProductStage<TArgs extends Prisma.ProductStageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.ProductStageGroupByArgs['orderBy'] } : { orderBy?: Prisma.ProductStageGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
        ? never
        : P extends string
        ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
        : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`,
        ]
    }[HavingFields]
    : 'take' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields], TQueryFnData = {} extends InputErrors ?
    Array<PickEnumerable<Prisma.ProductStageGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.ProductStageGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.ProductStageGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.ProductStageGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.ProductStageGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ProductStage', `${endpoint}/productStage/groupBy`, args, options, fetch);
}

export function useCountProductStage<TArgs extends Prisma.ProductStageCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.ProductStageCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ProductStageCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ProductStage', `${endpoint}/productStage/count`, args, options, fetch);
}

export function useSuspenseCountProductStage<TArgs extends Prisma.ProductStageCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.ProductStageCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ProductStageCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ProductStage', `${endpoint}/productStage/count`, args, options, fetch);
}
import type { Stage } from '@prisma/client';

export function useCheckProductStage<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; stage?: Stage; done?: boolean; ownerProductId_stages?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('ProductStage', `${endpoint}/productStage/check`, args, options, fetch);
}
import type { Stage } from '@prisma/client';

export function useTransaction<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; stage?: Stage; done?: boolean; ownerProductId_stages?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('ProductStage', `${endpoint}/productStage/transaction`, args, options, fetch);
}
